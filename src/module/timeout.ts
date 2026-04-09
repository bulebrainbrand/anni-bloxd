import { queueMicroTask } from "./microTask";

interface TimerTask {
  id: number;
  expiry: number;
  callback: (...args: any[]) => void;
  args: any[];
  interval?: number; // setInterval の場合のみ保持
}

class TimerHeap {
  private heap: TimerTask[] = [];

  push(task: TimerTask) {
    this.heap.push(task);
    this.siftUp(this.heap.length - 1);
  }

  pop(): TimerTask | undefined {
    if (this.size() === 0) return undefined;
    const top = this.heap[0];
    const last = this.heap.pop()!;
    if (this.size() > 0) {
      this.heap[0] = last;
      this.siftDown(0);
    }
    return top;
  }

  peek() {
    return this.heap[0];
  }
  size() {
    return this.heap.length;
  }

  private siftUp(i: number) {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.heap[i].expiry >= this.heap[p].expiry) break;
      [this.heap[i], this.heap[p]] = [this.heap[p], this.heap[i]];
      i = p;
    }
  }

  private siftDown(i: number) {
    while (true) {
      let s = i,
        l = 2 * i + 1,
        r = 2 * i + 2;
      if (l < this.heap.length && this.heap[l].expiry < this.heap[s].expiry)
        s = l;
      if (r < this.heap.length && this.heap[r].expiry < this.heap[s].expiry)
        s = r;
      if (s === i) break;
      [this.heap[i], this.heap[s]] = [this.heap[s], this.heap[i]];
      i = s;
    }
  }
}

const timerHeap = new TimerHeap();
const cancelledIds = new Set<number>();
let idCounter = 1;

/**
 * 共通のタイマー登録処理
 */
function createTimer(
  callback: VoidFunction,
  delay: number,
  interval: number | undefined,
  args: any[],
): number {
  const id = idCounter++;
  const expiry = Date.now() + Math.max(0, delay);

  timerHeap.push({
    id,
    expiry,
    callback,
    args,
    interval,
  });

  return id;
}

// --- 公開 API ---

export function mySetTimeout(cb: VoidFunction, delay = 0, ...args: any[]) {
  return createTimer(cb, delay, undefined, args);
}

export function mySetInterval(cb: VoidFunction, delay = 0, ...args: any[]) {
  return createTimer(cb, delay, delay, args);
}

export function myClearTimer(id: number | undefined) {
  if (id) cancelledIds.add(id);
}

/**
 * ホスト環境のループから呼ばれる関数
 */
export function runTimeouts() {
  const now = Date.now();

  while (timerHeap.size() > 0) {
    const next = timerHeap.peek()!;

    if (next.expiry > now) break;

    const task = timerHeap.pop()!;

    // キャンセルチェック
    if (cancelledIds.has(task.id)) {
      cancelledIds.delete(task.id);
      continue;
    }

    queueMicroTask(() => {
      try {
        task.callback(...task.args);
      } catch (e: any) {
        console.log(e, e?.stack, "on running timer task");
      }
      if (task.interval !== undefined) {
        task.expiry = Date.now() + task.interval;
        timerHeap.push(task);
      }
    });

    // メモリ管理: ヒープが空ならキャンセルリストも掃除
    if (timerHeap.size() === 0) cancelledIds.clear();
  }
}
