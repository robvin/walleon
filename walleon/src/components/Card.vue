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
    }
  },

  data() {
    return {
      timeoutId: undefined as undefined | number,
      isExpanded: false as boolean
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
    setInitialPosition(): void {
      const target = this.$refs.modal as HTMLElement;
      const rect = (this.$refs.button as HTMLElement).getBoundingClientRect();
      const x = rect.x + rect.width / 2;
      const y = rect.y + rect.height / 2;

      target.style.left = x + "px";
      target.style.top = y + "px";
    },

    setInitialSize(): void {
      const target = this.$refs.modal as HTMLElement;
      const rect = (this.$refs.button as HTMLElement).getBoundingClientRect();

      target.style.width = rect.width + "px";
      target.style.height = rect.height + "px";
    },

    beforeEnter(): void {
      this.setInitialSize();
    },

    enter(): void {
      // Not sure why this works. Does not transition otherwise.
      this.setInitialPosition();
      (this.$refs.modal as HTMLElement).removeAttribute("style");
      this.setInitialPosition();
    },

    afterEnter(): void {
      (this.$refs.button as HTMLElement).blur();
    },

    beforeLeave(): void {
      this.setInitialSize();
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
