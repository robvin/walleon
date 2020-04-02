<template>
  <div>
    <button
      ref="button"
      class="device"
      :class="classes"
      :disabled="disabled"
      @mousedown="handleMouseDown"
    >
      <slot />
    </button>

    <transition
      name="peek"
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      @before-leave="beforeLeave"
      @after-leave="afterLeave"
    >
      <div v-if="isExpanded" class="modal-wrapper">
        <div class="modal-cover" @click.self="isExpanded = false"></div>
        <div ref="modal" class="modal">
          <div class="modal__inner">
            <button class="modal__close" @click="isExpanded = false">
              <img svg-inline src="@/assets/images/close-circle.svg" />
            </button>
            <slot name="modal" />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Card",

  props: {
    active: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
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
      timeoutId: undefined as undefined | number,
      isExpanded: false as boolean,
      boundWidth: 0 as number,
      boundHeight: 0 as number
    };
  },

  computed: {
    classes(): object {
      return {
        "device--active": this.active,
        "device--loading": this.loading
      };
    }
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
      const rect = (this.$refs.button as HTMLElement).getBoundingClientRect();

      target.style.top = rect.y + "px";
      target.style.left = rect.x + "px";
      target.style.height = rect.width + "px";
      target.style.width = rect.height + "px";
    },

    setTargetStyle(): void {
      const target = this.$refs.modal as HTMLElement;
      const rect = (this.$refs.button as HTMLElement).getBoundingClientRect();
      const margin = 30;
      const offsetY = (rect.height - this.height) / 2;
      const offsetX = (rect.width - this.width) / 2;
      const yMax = this.boundHeight - this.height - margin;
      const xMax = this.boundWidth - this.width - margin;
      const yTarget = rect.y + offsetY;
      const xTarget = rect.x + offsetX;
      const y = Math.min(yMax, Math.max(margin, yTarget));
      const x = Math.min(xMax, Math.max(margin, xTarget));

      if (this.boundWidth < this.width + margin) {
        target.style.top = "0px";
        target.style.left = "0px";
        target.style.height = "100vh";
        target.style.width = "100vw";
      } else {
        target.style.top = y + "px";
        target.style.left = x + "px";
        target.style.height = this.height + "px";
        target.style.width = this.width + "px";
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
      (this.$refs.button as HTMLElement).blur();
    },

    beforeLeave(): void {
      this.setInitialStyle();
    },

    afterLeave(): void {
      window.removeEventListener("resize", this.handleResize, false);
    },

    handleMouseDown(event: MouseEvent) {
      const longpressDuration = 500;

      if (event.which !== 1) return;

      document.body.addEventListener("mouseup", this.handleMouseUp, false);

      this.timeoutId = setTimeout(() => {
        this.isExpanded = true;
        document.body.addEventListener("mousemove", this.handleMouseMove, false);
      }, longpressDuration);
    },

    handleMouseUp(event: MouseEvent) {
      if (event.which !== 1) return;

      if (this.isExpanded) {
        this.$emit("released", event);
      } else {
        this.$emit("clicked", event);
      }

      clearTimeout(this.timeoutId);
      document.body.removeEventListener("mouseup", this.handleMouseUp, false);
      document.body.removeEventListener("mousemove", this.handleMouseMove, false);
    },

    handleMouseMove(event: MouseEvent) {
      this.$emit("moved", event);
    }
  }
});
</script>
