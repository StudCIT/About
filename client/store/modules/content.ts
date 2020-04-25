import { Getters, Mutations, Actions, Module } from 'vuex-smart-module';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { Store } from 'vuex';
import Vue from 'vue';

import { ContentEntity, ContentFiltersModel } from '../interfaces';

class ContentState {
	contents!: ContentEntity;
	content!: ContentEntity;
	error!: any;
}

class ContentGetters extends Getters<ContentState> {
	public get getError(): any {
		return this.state.error;
	}

	public get getContent(): ContentEntity {
		return this.state.content;
	}

	public get getContents(): ContentEntity {
		return this.state.contents;
	}
}

class ContentMutations extends Mutations<ContentState> {
	public setError(data: any): void {
		return Vue.set(this.state, 'error', data);
	}

	public setContents({ data }: { data: ContentEntity[] }) {
		return Vue.set(this.state, 'contents', data);
	}

	public setContent(data: ContentEntity) {
		return Vue.set(this.state, 'content', data);
	}
}

class ContentActions extends Actions<
	ContentState,
	ContentGetters,
	ContentMutations,
	ContentActions
> {
	private store!: Store<NuxtAxiosInstance> | any;

	public $init(store: Store<NuxtAxiosInstance>): void {
		this.store = store;
	}

	public async createContent({ params, data }): Promise<void> {
		return await this.store.$axios
			.$post('/api/content', data, { params })
			.then(this.mutations.setContent)
			.catch(this.mutations.setError);
	}

	public async selectContent(params?: ContentFiltersModel): Promise<void> {
		return await this.store.$axios
			.$get('/api/content', { params })
			.then(this.mutations.setContents)
			.catch(this.mutations.setError);
	}

	public async updateContent({ params, ...data }): Promise<void> {
		return await this.store.$axios
			.$patch('/api/content', data, { params })
			.then(this.mutations.setContent)
			.catch(this.mutations.setError);
	}

	public async deleteContent({ id }: ContentEntity): Promise<void> {
		return await this.store.$axios
			.$delete('/api/content', { params: { id } })
			.then(this.mutations.setContent)
			.catch(this.mutations.setError);
	}
}

export const ContentModule = new Module({
	state: ContentState,
	getters: ContentGetters,
	mutations: ContentMutations,
	actions: ContentActions,
});
