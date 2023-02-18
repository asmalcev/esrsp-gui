import { Performance } from '../../backend.types';

export type UpdateTableInfo = {
	column: number;
	row: number;
	id: number;
};

export type NextTableWithUpdateInput = {
	column: number;
	row: number;
	performance: Performance;
};

export enum TableSize {
	small = 'small',
	medium = 'medium',
}
