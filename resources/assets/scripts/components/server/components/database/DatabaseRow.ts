import Vue from 'vue';
import Icon from "@/components/core/Icon";
import Modal from "@/components/core/Modal";
import {ServerDatabase} from "@/api/server/types";
import DeleteDatabaseModal from "@/components/server/components/database/DeleteDatabaseModal";

export default Vue.component('DatabaseRow', {
    components: {DeleteDatabaseModal, Modal, Icon},
    props: {
        database: {
            type: Object as () => ServerDatabase,
            required: true,
        }
    },

    data: function () {
        return {
            showDeleteModal: false,
        };
    },

    methods: {
        revealPassword: function () {
            this.database.showPassword = !this.database.showPassword;
        },
    },

    template: `
        <div class="content-box mb-6 hover:border-neutral-200">
            <div class="flex items-center text-neutral-800">
                <icon name="database" class="flex-none text-green-500"></icon>
                <div class="flex-1 px-4">
                    <p class="uppercase text-xs text-neutral-500 pb-1 select-none">Database Name</p>
                    <p>{{database.name}}</p>
                </div>
                <div class="flex-1 px-4">
                    <p class="uppercase text-xs text-neutral-500 pb-1 select-none">Username</p>
                    <p>{{database.username}}</p>
                </div>
                <div class="flex-1 px-4">
                    <p class="uppercase text-xs text-neutral-500 pb-1 select-none">Password</p>
                    <p>
                        <code class="text-sm cursor-pointer" v-on:click="revealPassword">
                            <span class="select-none" v-if="!database.showPassword">
                                <icon name="lock" class="h-3"/> &bull;&bull;&bull;&bull;&bull;&bull;
                            </span>
                            <span v-else>{{database.password}}</span>
                        </code>
                    </p>
                </div>
                <div class="flex-1 px-4">
                    <p class="uppercase text-xs text-neutral-500 pb-1 select-none">Server</p>
                    <p><code class="text-sm">{{database.host.address}}:{{database.host.port}}</code></p>
                </div>
                <div class="flex-none px-4">
                    <button class="btn btn-xs btn-secondary btn-red" v-on:click="showDeleteModal = true">
                        <icon name="trash-2" class="w-3 h-3 mx-1"/>
                    </button>
                </div>
            </div>
            <modal :show="showDeleteModal" v-on:close="showDeleteModal = false">
                <DeleteDatabaseModal
                        :database="database"
                        v-on:close="showDeleteModal = false"
                        v-if="showDeleteModal"
                />
            </modal>
        </div>
    `,
})