import { StorageEntity } from './cover.interface';

export interface ContentEntity {
	/**
	 * [id description]
	 */
	readonly id: string;

	/**
	 * [lang description]
	 */
	readonly lang: string;

	/**
	 * [title description]
	 */
	readonly title: string;

	/**
	 * [description description]
	 */
	readonly description: string;

	/**
	 * [createAt description]
	 */
	readonly createAt: Date;

	/**
	 * [updateAt description]
	 */
	readonly updateAt: Date;

	/**
	 * [cover description]
	 */
	readonly cover: StorageEntity;
}
