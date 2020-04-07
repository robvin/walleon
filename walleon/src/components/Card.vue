<template>
  <div>
    <button
      ref="button"
      class="device"
      :class="classes"
      :disabled="disabled"
      @mouseup="handleMouseUp"
      @touchstart="handleTouchStart"
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
      <div v-if="isExpanded" class="modal-wrapper" @keyup.esc="isExpanded = false">
        <div class="modal-cover" @click.self="isExpanded = false"></div>
        <div ref="modal" class="modal">
          <div ref="content" class="modal__inner">
            <button
              ref="close"
              class="modal__close"
              @click="isExpanded = false"
              @touchend="isExpanded = false"
            >
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
      boundHeight: 0 as number,
      movementX: null as number | null,
      movementY: null as number | null
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
      const content = this.$refs.content as HTMLElement;
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
        target.style.height = this.boundHeight + "px";
        target.style.width = this.boundWidth + "px";
        content.style.width = this.boundWidth + "px";
      } else {
        target.style.top = y + "px";
        target.style.left = x + "px";
        target.style.height = this.height + "px";
        target.style.width = this.width + "px";
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
      (this.$refs.button as HTMLElement).blur();
    },

    beforeLeave(): void {
      this.setInitialStyle();
    },

    afterLeave(): void {
      window.removeEventListener("resize", this.handleResize, false);
    },

    handleTouchStart() {
      const longpressDuration = 500;

      if (this.disabled) return;

      document.body.addEventListener("touchend", this.handleTouchEnd, false);
      document.body.addEventListener("touchcancel", this.handleTouchEnd, false);
      document.body.addEventListener("touchmove", this.handleTouchMoveInside, false);

      this.timeoutId = setTimeout(() => {
        this.isExpanded = true;
        document.body.addEventListener("touchend", this.handleTouchEnd, false);
        document.body.addEventListener("touchcancel", this.handleTouchEnd, false);
        document.body.removeEventListener("touchmove", this.handleTouchMoveInside, false);
        document.body.addEventListener("touchmove", this.handleTouchMove, false);
      }, longpressDuration);
    },

    handleMouseUp(event: MouseEvent) {
      const doubleClickDuration = 200;

      if (event.which !== 1) return;

      if (this.timeoutId !== undefined) {
        clearTimeout(this.timeoutId);
        this.timeoutId = undefined;
        this.isExpanded = true;
      } else {
        this.timeoutId = setTimeout(() => {
          this.$emit("clicked", event);
          clearTimeout(this.timeoutId);
          this.timeoutId = undefined;
        }, doubleClickDuration);
      }
    },

    handleTouchEnd(event: TouchEvent) {
      if (this.isExpanded) {
        this.$emit("released", event);
      } else {
        this.$emit("clicked", event);
      }

      clearTimeout(this.timeoutId);
      document.body.removeEventListener("touchend", this.handleTouchEnd, false);
      document.body.removeEventListener("touchmove", this.handleTouchMove, false);
    },

    handleTouchMove(event: TouchEvent) {
      let movementX = 0;
      let movementY = 0;

      const newX = event.changedTouches[0].clientX;
      const newY = event.changedTouches[0].clientY;

      if (this.movementX !== null && this.movementY !== null) {
        movementX = newX - this.movementX;
        movementY = newY - this.movementY;
      }

      this.movementX = newX;
      this.movementY = newY;

      this.$emit("moved", event, movementX, movementY);
    },

    handleTouchMoveInside(event: TouchEvent) {
      const original = event.target as Node;
      const current = document.elementFromPoint(event.touches[0].pageX, event.touches[0].pageY);

      if (!original.isSameNode(current) || !original.contains(current)) {
        clearTimeout(this.timeoutId);
        document.body.removeEventListener("touchmove", this.handleTouchMoveInside, false);
        document.body.removeEventListener("touchend", this.handleTouchEnd, false);
        document.body.removeEventListener("touchcancel", this.handleTouchEnd, false);
        document.body.removeEventListener("touchmove", this.handleTouchMove, false);
      }
    }
  }
});
</script>
