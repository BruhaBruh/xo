export type User = 'x' | 'o';

export type CellValue = User | null;

export type Winner = User | null;

export type WinnerOrDraw = Winner | 'draw';
