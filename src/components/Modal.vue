<template>
  <transition
    name="peek"
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    @after-leave="afterLeave"
  >
    <div v-if="isExpanded" class="modal-wrapper" @keyup.esc="close()">
      <div class="modal-cover" @click.self="close()"></div>
      <div ref="modal" class="modal">
        <div ref="content" class="modal__inner">
          <button ref="close" class="modal__close" @mouseup="close()" @touchend="close()">
            <img svg-inline src="@/assets/images/close-circle.svg" />
          </button>
          <slot name="modal" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Modal",

  props: {
    isExpanded: {
      type: Boolean,
      default: false
    },
    origin: {
      type: HTMLElement,
      required: false,
      default: null
    },
    width: {
      type: Number,
      default: 420
    },
    height: {
      type: Number,
      default: 600
    }
  },

  data() {
    return {
      boundWidth: 0 as number,
      boundHeight: 0 as number
    };
  },

  methods: {
    handleResize(): void {
      // TODO: Throttle these calls
      this.setBound();

      if (this.isExpanded) {
        this.setTargetStyle();
      }
    },

    setBound(): void {
      this.boundWidth = window.innerWidth;
      this.boundHeight = window.innerHeight;
    },

    setInitialStyle(): void {
      const target = this.$refs.modal as HTMLElement;

      if (this.origin) {
        const rect = (this.origin as HTMLElement).getBoundingClientRect();

        target.style.left = rect.x + "px";
        target.style.top = rect.y + "px";
        target.style.width = rect.height + "px";
        target.style.height = rect.width + "px";
      } else {
        target.style.left = this.boundWidth / 2 + "px";
        target.style.top = this.boundHeight / 2 + "px";
        target.style.width = "0px";
        target.style.height = "0px";
      }
    },

    setTargetStyle(): void {
      const target = this.$refs.modal as HTMLElement;
      const content = this.$refs.content as HTMLElement;
      const margin = 30;
      const xMax = this.boundWidth - this.width - margin;
      const yMax = this.boundHeight - this.height - margin;
      let offsetX = this.width / -2;
      let offsetY = this.height / -2;
      let xTarget = this.boundWidth / 2 + offsetX;
      let yTarget = this.boundHeight / 2 + offsetY;
      let x = Math.min(xMax, Math.max(margin, xTarget));
      let y = Math.min(yMax, Math.max(margin, yTarget));

      if (this.origin) {
        const rect = (this.origin as HTMLElement).getBoundingClientRect();
        offsetX = (rect.width - this.width) / 2;
        offsetY = (rect.height - this.height) / 2;
        xTarget = rect.x + offsetX;
        yTarget = rect.y + offsetY;
        x = Math.min(xMax, Math.max(margin, xTarget));
        y = Math.min(yMax, Math.max(margin, yTarget));
      }

      if (this.boundWidth < this.width + margin) {
        target.style.left = "0px";
        target.style.top = "0px";
        target.style.width = this.boundWidth + "px";
        target.style.height = this.boundHeight + "px";
        content.style.width = this.boundWidth + "px";
      } else {
        target.style.left = x + "px";
        target.style.top = y + "px";
        target.style.width = this.width + "px";
        target.style.height = this.height + "px";
        content.style.width = this.width + "px";
      }
    },

    beforeEnter(): void {
      window.addEventListener("resize", this.handleResize, false);
      this.setBound();
      this.setInitialStyle();
    },

    enter(): void {
      this.setTargetStyle();
    },

    afterEnter(): void {
      (this.$refs.close as HTMLElement).focus();
    },

    beforeLeave(): void {
      this.setInitialStyle();
    },

    afterLeave(): void {
      window.removeEventListener("resize", this.handleResize, false);
    },

    close(): void {
      this.$emit("close");
    }
  }
});
</script>
