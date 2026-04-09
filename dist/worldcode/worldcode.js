(() => {
  // dist/.temp/worldcode/onClose.js
  globalThis.onClose = (serverIsShuttingDown) => {
    api.setMaxPlayers(40, 40);
  };

  // dist/.temp/worldcode/onload.js
  api.setMaxPlayers(40, 40);

  // dist/.temp/module/microTask.js
  var microTaskQueue = [];
  var queueMicroTask = (func) => {
    microTaskQueue.push(func);
  };
  var runMicroTask = () => {
    const copyMicroTaskQueue = [...microTaskQueue];
    while (copyMicroTaskQueue.length >= 1) {
      try {
        copyMicroTaskQueue[0]();
      } catch (error) {
        console.log(String(error), error?.stack, "on running micro task");
      } finally {
        copyMicroTaskQueue.shift();
        microTaskQueue.shift();
      }
    }
  };

  // dist/.temp/module/gamePhaseManager.js
  var GamePhaseManager = {
    currentPhase: 1,
    events: {
      1: [],
      2: [],
      3: [],
      4: [],
    },
    addEvent(phase2, func) {
      this.events[phase2].push(func);
    },
    movePhase() {
      ++this.currentPhase;
      if (this.currentPhase > 4) throw new Error("cannot move to gamephase 5");
      for (const func of this.events[this.currentPhase]) {
        queueMicroTask(func);
      }
    },
    getPhase() {
      return this.currentPhase;
    },
  };

  // dist/.temp/module/phaseManager.js
  var PhaseManager = {
    currentPhase: 0,
    events: {
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
    },
    addEvent(phase2, func) {
      this.events[phase2].push(func);
    },
    movePhase() {
      ++this.currentPhase;
      if (this.currentPhase > 5) throw new Error("cannot move to 6");
      for (const func of this.events[this.currentPhase]) {
        queueMicroTask(func);
      }
    },
    getPhase() {
      return this.currentPhase;
    },
  };

  // dist/.temp/module/mustBeKeepInventory.js
  var mustBekeepInventory = () => {
    if (GamePhaseManager.getPhase() !== 3) return true;
    const phase2 = PhaseManager.getPhase();
    if (phase2 === 0 || phase2 === 1 || phase2 === 2) return true;
    return false;
  };

  // dist/.temp/worldcode/onMobKilledPlayer.js
  globalThis.onMobKilledPlayer = (
    attackingMob,
    killedPlayer,
    damageDealt,
    withItem,
  ) => {
    if (mustBekeepInventory()) return "keepInventory";
  };

  // dist/.temp/module/timeout.js
  var TimerHeap = class {
    heap = [];
    push(task) {
      this.heap.push(task);
      this.siftUp(this.heap.length - 1);
    }
    pop() {
      if (this.size() === 0) return void 0;
      const top = this.heap[0];
      const last = this.heap.pop();
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
    siftUp(i) {
      while (i > 0) {
        const p = (i - 1) >> 1;
        if (this.heap[i].expiry >= this.heap[p].expiry) break;
        [this.heap[i], this.heap[p]] = [this.heap[p], this.heap[i]];
        i = p;
      }
    }
    siftDown(i) {
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
  };
  var timerHeap = new TimerHeap();
  var cancelledIds = /* @__PURE__ */ new Set();
  var idCounter = 1;
  function createTimer(callback, delay, interval, args) {
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
  function mySetTimeout(cb, delay = 0, ...args) {
    return createTimer(cb, delay, void 0, args);
  }
  function mySetInterval(cb, delay = 0, ...args) {
    return createTimer(cb, delay, delay, args);
  }
  function runTimeouts() {
    const now = Date.now();
    while (timerHeap.size() > 0) {
      const next = timerHeap.peek();
      if (next.expiry > now) break;
      const task = timerHeap.pop();
      if (cancelledIds.has(task.id)) {
        cancelledIds.delete(task.id);
        continue;
      }
      queueMicroTask(() => {
        try {
          task.callback(...task.args);
        } catch (e) {
          console.log(e, e?.stack, "on running timer task");
        }
        if (task.interval !== void 0) {
          task.expiry = Date.now() + task.interval;
          timerHeap.push(task);
        }
      });
      if (timerHeap.size() === 0) cancelledIds.clear();
    }
  }

  // dist/.temp/utilConsts.js
  var ONE_SECOND_ON_MS = 1e3;
  var ONE_MINITU_ON_MS = ONE_SECOND_ON_MS * 60;

  // dist/.temp/consts.js
  var NEXUS_BLOCK_REPLACING_MS = 500;
  var APPLY_BUFF_TYPE_BY_PHASE = {
    0: "none",
    1: "none",
    2: "none",
    3: "none",
    4: "short",
    5: "long",
  };
  var TEAM_TO_ICON = {
    blue: "Blue Popup Tower",
    green: "Green Popup Tower",
    red: "Red Popup Tower",
    yellow: "Yellow Popup Tower",
  };
  var INIT_NEXUS_HP = 75;
  var NEED_PHASE_FOR_MINE_ORE = {
    "Coal Ore": 1,
    "Iron Ore": 1,
    "Gold Ore": 2,
    "Moonstone Ore": 3,
    "Diamond Ore": 4,
  };
  var ORE_RESPAWN_TIME = {
    "Coal Ore": 800,
    "Iron Ore": 1e3,
    "Gold Ore": 1200,
    "Moonstone Ore": 2e3,
    "Diamond Ore": 3e4,
  };
  var MIN_MATCHING_NUMBER_PLAYER = 8;
  var MATCHING_WAITING_MS = 6e4;
  var PHASE_TIME = {
    1: ONE_MINITU_ON_MS * 5,
    2: ONE_MINITU_ON_MS * 10,
    3: ONE_MINITU_ON_MS * 10,
    4: ONE_MINITU_ON_MS * 20,
    5: Infinity,
  };
  var PHASE_ELAPSED_TIME_OF_START_PHASE_1 = {
    1: PHASE_TIME[1],
    2: PHASE_TIME[1] + PHASE_TIME[2],
    3: PHASE_TIME[1] + PHASE_TIME[2] + PHASE_TIME[3],
    4: PHASE_TIME[1] + PHASE_TIME[2] + PHASE_TIME[3] + PHASE_TIME[4],
    5:
      PHASE_TIME[1] +
      PHASE_TIME[2] +
      PHASE_TIME[3] +
      PHASE_TIME[4] +
      PHASE_TIME[5],
  };
  var CAN_CHANGE_AREA = [
    [1e4, -499, 1e4],
    [10321, -380, 10321],
  ];
  var TEAM_BASE_AREAS = [
    [
      [1e4, -499, 1e4],
      [10030, -380, 10030],
    ],
    [
      [10291, -499, 1e4],
      [10321, -380, 10030],
    ],
    [
      [1e4, -499, 10291],
      [10030, -380, 10321],
    ],
    [
      [10291, -490, 10291],
      [10321, -380, 10321],
    ],
  ];
  var SHORT_BUFF_INFO = [
    { name: "Damage", dura: 3e3, level: 1 },
    { name: "Damage Reduction", dura: 3e3, level: 1 },
    { name: "Double Jump", dura: 4e3, level: 1 },
  ];
  var LONG_BUFF_INFO = [
    { name: "Damage", dura: 8e3, level: 1 },
    { name: "Damage Reduction", dura: 8e3, level: 1 },
    { name: "Health Regen", dura: 8e3, level: 1 },
    { name: "Lifesteal", dura: 12e3, level: 4 },
  ];
  var PHASE_NEXUS_MULTIHELPER = {
    1: 0,
    2: 1,
    3: 2,
    4: 2,
    5: 5,
  };
  var NEXUS_BLOCK = "Obsidian";
  var NEXUS_REPLACING_BLOCK = "Bedrock";
  var NEXUS_COOEDINATE_BY_TEAM = {
    blue: [1, 1, 1],
    green: [2, 2, 2],
    red: [3, 3, 3],
    yellow: [4, 4, 4],
  };

  // dist/.temp/module/mineOreManager.js
  var tryMineOre = (x, y, z, type) => {
    if (GamePhaseManager.getPhase() !== 3) return false;
    const phase2 = PhaseManager.getPhase();
    if (NEED_PHASE_FOR_MINE_ORE[type] > phase2) return false;
    mySetTimeout(() => {
      api.setBlock(x, y, z, type);
    }, ORE_RESPAWN_TIME[type]);
    api.setBlock(x, y, z, "Messy Stone");
    return true;
  };
  var checkBlockCanMine = (block) =>
    block === "Coal Ore" ||
    block === "Iron Ore" ||
    block === "Gold Ore" ||
    block === "Diamond Ore" ||
    block === "Mooonstone Ore";

  // dist/.temp/module/canChangeArea.js
  var isInRect = ([x, y, z], [[x1, y1, z1], [x2, y2, z2]]) =>
    x >= x1 && x <= x2 && y >= y1 && y <= y2 && z >= z1 && z <= z2;
  var checkCanChange = (x, y, z) => {
    return (
      isInRect([x, y, z], CAN_CHANGE_AREA) &&
      TEAM_BASE_AREAS.every((area) => !isInRect([x, y, z], area))
    );
  };

  // dist/.temp/module/nexusHpManage.js
  var nexusHps = {
    red: INIT_NEXUS_HP,
    green: INIT_NEXUS_HP,
    blue: INIT_NEXUS_HP,
    yellow: INIT_NEXUS_HP,
  };
  var decrementNexusHP = (team, amount) => {
    return (nexusHps[team] -= amount);
  };
  var getNexusHPs = () => {
    return nexusHps;
  };

  // dist/.temp/module/nexusHpHandler.js
  var breakNexus = (team, phase2, damage = 1) => {
    if (phase2 === 1) return false;
    const calcedDamage = PHASE_NEXUS_MULTIHELPER[phase2] * damage;
    decrementNexusHP(team, calcedDamage);
    return calcedDamage;
  };

  // dist/.temp/module/playerTeam.js
  var playerTeamMap = /* @__PURE__ */ new Map();
  var initPlayerInTeam = (playerId, team) => {};
  var joinTeam = (playerId, team) => {
    playerTeamMap.set(playerId, team);
    initPlayerInTeam(playerId, team);
  };
  var getTeam = (playerId) => playerTeamMap.get(playerId);

  // dist/.temp/module/nexusBlockManager.js
  var replaceNexusAndSetTimeoutRemove = (x, y, z) => {
    api.setBlock(x, y, z, NEXUS_REPLACING_BLOCK);
    mySetTimeout(
      () => api.setBlock(x, y, z, NEXUS_BLOCK),
      NEXUS_BLOCK_REPLACING_MS,
    );
  };
  var isNexusBlock = (block) => block === NEXUS_BLOCK;

  // dist/.temp/module/rightInfoText.js
  var setEveryRightInfoText = (text) => {
    for (const id of api.getPlayerIds())
      api.setClientOption(id, "RightInfoText", text);
  };
  var makeNexusHpText = () => {
    const nexusHpData = getNexusHPs();
    let text = [];
    for (const [team, hp] of Object.entries(nexusHpData)) {
      text.push(
        { icon: TEAM_TO_ICON[team] },
        { str: team + " ", style: { color: team } },
        { str: hp.toString() + "\n", style: { color: "gold" } },
      );
    }
    return text;
  };
  var makePhaseText = () => {
    const phase2 = PhaseManager.getPhase();
    return [{ str: "phase " + String(phase2), style: { color: "pink" } }, "\n"];
  };
  var updateRightInfoText = () => {
    if (GamePhaseManager.getPhase() === 3)
      queueMicroTask(() =>
        setEveryRightInfoText([...makeNexusHpText(), ...makePhaseText()]),
      );
    else queueMicroTask(() => setEveryRightInfoText(""));
  };
  GamePhaseManager.addEvent(3, updateRightInfoText);
  mySetInterval(updateRightInfoText, 1e3);

  // dist/.temp/module/nexusBreakManager.js
  var isBreakingNexus = (block) => isNexusBlock(block);
  var isSameCoordinate = (x, y, z, coordinate) =>
    x === coordinate[0] && y === coordinate[1] && z === coordinate[2];
  var getTeamByNexusCoordinate = (x, y, z) => {
    for (const [team, coordinate] of Object.entries(NEXUS_COOEDINATE_BY_TEAM)) {
      if (isSameCoordinate(x, y, z, coordinate)) return team;
    }
    return false;
  };
  var breakNexus2 = (playerId, x, y, z) => {
    if (GamePhaseManager.getPhase() !== 3)
      throw new Error("cannot break nexus yet");
    const phase2 = PhaseManager.getPhase();
    if (phase2 === 1 || phase2 === 0) return false;
    const team = getTeamByNexusCoordinate(x, y, z);
    if (team === false) return false;
    const playerTeam = getTeam(playerId);
    if (team === playerTeam) return false;
    replaceNexusAndSetTimeoutRemove(x, y, z);
    breakNexus(team, phase2);
    updateRightInfoText();
    return true;
  };

  // dist/.temp/worldcode/onPlayerChangeBlock.js
  api.setCallbackValueFallback("onPlayerChangeBlock", "preventChange");
  globalThis.onPlayerChangeBlock = (
    playerId,
    x,
    y,
    z,
    fromBlock,
    toBlock,
    droppedItem,
  ) => {
    if (GamePhaseManager.getPhase() !== 3) return "preventChange";
    if (!checkCanChange(x, y, z)) return "preventChange";
    if (checkBlockCanMine(fromBlock))
      return tryMineOre(x, y, z, fromBlock) ? void 0 : "preventChange";
    if (isBreakingNexus(fromBlock))
      return breakNexus2(playerId, x, y, z) ? void 0 : "preventChange";
  };

  // dist/.temp/worldcode/onPlayerDamagingOtherPlayer.js
  api.setCallbackValueFallback("onPlayerDamagingOtherPlayer", "preventDamage");
  globalThis.onPlayerDamagingOtherPlayer = (
    attackingPlayer,
    damagedPlayer,
    damageDealt,
    withItem,
    bodyPartHit,
    damagerDbId,
  ) => {
    if (GamePhaseManager.getPhase() !== 3) return "preventDamage";
    if (PhaseManager.getPhase() === 1) return "preventDamage";
    const attackingPlayerTeam = getTeam(attackingPlayer);
    if (attackingPlayerTeam == void 0) return "preventDamage";
    const damagedPlayerTeam = getTeam(damagedPlayer);
    if (damagedPlayerTeam == null) return "preventDamage";
    if (attackingPlayerTeam === damagedPlayerTeam) return "preventDamage";
  };

  // dist/.temp/module/applyBuff.js
  var applyShortBuff = (playerId) => {
    const playerBuffs = api.getEffects(playerId);
    const { name, dura, level } =
      SHORT_BUFF_INFO[Math.floor(Math.random() * SHORT_BUFF_INFO.length)];
    if (playerBuffs.includes(name)) return false;
    api.applyEffect(playerId, name, dura, { inbuildLevel: level });
    return true;
  };
  var applyLongBuff = (playerId) => {
    const playerBuffs = api.getEffects(playerId);
    const { name, dura, level } =
      LONG_BUFF_INFO[Math.floor(Math.random() * LONG_BUFF_INFO.length)];
    if (playerBuffs.includes(name)) return false;
    api.applyEffect(playerId, name, dura, { inbuildLevel: level });
    return true;
  };

  // dist/.temp/module/sounds.js
  var playSoundOnApplyShortBuff = (playerId) => {
    const sound = "magicAccent1";
    api.playSound(playerId, sound, 1, 0.8);
  };
  var playSoundOnApplyLongBuff = (playerId) => {
    const sound = "magicAccent2";
    api.playSound(playerId, sound, 1, 1.5);
  };

  // dist/.temp/module/onKillBuff.js
  var checkShouldApplyBuffType = () => {
    if (GamePhaseManager.getPhase() !== 3) return "none";
    return APPLY_BUFF_TYPE_BY_PHASE[PhaseManager.getPhase()];
  };
  var tryApplyBuffOnKilledPlayer = (playerId) => {
    const buffType = checkShouldApplyBuffType();
    if (buffType === "none") return;
    if (buffType === "short") {
      const isApplyBuff = applyShortBuff(playerId);
      if (isApplyBuff) playSoundOnApplyShortBuff(playerId);
      return;
    }
    if (buffType === "long") {
      const isApplyBuff = applyLongBuff(playerId);
      if (isApplyBuff) playSoundOnApplyLongBuff(playerId);
      return;
    }
  };

  // dist/.temp/worldcode/onPlayerKilledOtherPlayer.js
  api.setCallbackValueFallback("onPlayerKilledOtherPlayer", "keepInventory");
  globalThis.onPlayerKilledOtherPlayer = (
    attackingPlayer,
    killedPlayer,
    damageDealt,
    withItem,
  ) => {
    if (mustBekeepInventory()) return "keepInventory";
    tryApplyBuffOnKilledPlayer(attackingPlayer);
  };

  // dist/.temp/module/matching.js
  var checkCanMatch = () => api.getNumPlayers() >= MIN_MATCHING_NUMBER_PLAYER;
  var COUNT_TO_TEAMNAME_LOOKUP = {
    0: "red",
    1: "blue",
    2: "yellow",
    3: "green",
  };
  var doMatching = () => {
    let count = 0;
    for (const id of api.getPlayerIds().sort((a, b) => Math.random() - 0.5)) {
      count++;
      count %= 4;
      queueMicroTask(() => {
        if (api.checkValid(id)) joinTeam(id, COUNT_TO_TEAMNAME_LOOKUP[count]);
      });
    }
  };

  // dist/.temp/module/GamePhaseMover.js
  var nextTryMatchMs = Date.now() + MATCHING_WAITING_MS;
  var runOnCurrentPhase1 = () => {
    GamePhaseManager.movePhase();
  };
  var runOnCurrentPhase2 = () => {
    if (Date.now() < nextTryMatchMs) return;
    if (!checkCanMatch()) return;
    eval("");
    doMatching();
    GamePhaseManager.movePhase();
    api.setMaxPlayers(1, 1);
  };
  var timeOfStartPhase1 = 0;
  var runOnCurrentPhase3 = () => {
    const phase = PhaseManager.getPhase();
    if (phase === 0) {
      eval("");
      timeOfStartPhase1 = Date.now();
      PhaseManager.movePhase();
      return;
    }
    if (phase === 5) return;
    const nextPhaseTime =
      timeOfStartPhase1 + PHASE_ELAPSED_TIME_OF_START_PHASE_1[phase + 1];
    if (Date.now() > nextPhaseTime) {
      eval("");
      PhaseManager.movePhase();
    }
  };
  var runGamePhaseMover = () => {
    const gamePhase = GamePhaseManager.getPhase();
    if (gamePhase === 1) runOnCurrentPhase1();
    else if (gamePhase === 2) runOnCurrentPhase2();
    else if (gamePhase === 3) runOnCurrentPhase3();
  };

  // dist/.temp/worldcode/tick.js
  globalThis.tick = () => {
    runMicroTask();
    runTimeouts();
    runGamePhaseMover();
  };
})();
