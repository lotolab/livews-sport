import { defineAsyncComponent } from 'vue';

export const PtrBox = defineAsyncComponent(
  () => import('./PositionTopRight.vue')
);
