const initialState = {
  age: 1,
  cells: [[]],
}
export default (state=initialState , action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'LIFEGAME_INIT':
      // セルをすべてfalseで初期化
      const size = action.payload.size;
      newState.cells = getInitialCells(size);
      newState.age = 1;
      return newState;
    case 'LIFEGAME_NEXT':
      // セルの状態を次世代に進める
      newState.cells = getNextCells(newState.cells);
      newState.age++;
      return newState;
    case 'LIFEGAME_SET_STATUS':
      // 指定されたセルの状態を設定する
      newState.cells[action.payload.y][action.payload.x] = action.payload.status;
      return newState;
    default:
      return state;
  }
}

// すべてfalseの2次元配列で初期化したセルを取得
const getInitialCells = (size) => {
  const cells = [];
  for (let y = 0; y < size; y++) {
    const row = [];
    for (let x = 0; x < size; x++) {
      row.push(false);
    }
    cells.push(row);
  }

  return cells;
}

// 次世代のセルの状態を取得する
// ルールの参考: https://ja.wikipedia.org/wiki/%E3%83%A9%E3%82%A4%E3%83%95%E3%82%B2%E3%83%BC%E3%83%A0#%E3%83%A9%E3%82%A4%E3%83%95%E3%82%B2%E3%83%BC%E3%83%A0%E3%81%AE%E3%83%AB%E3%83%BC%E3%83%AB
const getNextCells = (cells) => {
  const nextCells = JSON.parse(JSON.stringify(cells));
  for (let y = 1; y < cells.length - 1; y++) {
    for (let x = 1; x < cells[y].length - 1; x++) {
      // 周囲8マスの生きているセルのカウント
      const count = cells[y-1][x-1] + cells[y-1][x  ] + cells[y-1][x+1] +
                    cells[y  ][x-1]                   + cells[y  ][x+1] +
                    cells[y+1][x-1] + cells[y+1][x  ] + cells[y+1][x+1];
      // ルールに従って次世代の状態を判定する
      if (cells[y][x] == false) {
        if (count == 3) {
          // 誕生 - 死んでいるセルに隣接する生きたセルがちょうど3つあれば、次の世代が誕生する。
          nextCells[y][x] = true;
        }
      } else {
        if (count <= 1) {
          // 過疎 - 生きているセルに隣接する生きたセルが1つ以下ならば、過疎により死滅する。
          nextCells[y][x] = false;
        } else if (count >= 4) {
          // 過密 - 生きているセルに隣接する生きたセルが4つ以上ならば、過密により死滅する。
          nextCells[y][x] = false;
        } else {
          // 生存 - 生きているセルに隣接する生きたセルが2つか3つならば、次の世代でも生存する。
        }
      }
    }
  }
  return nextCells;
}