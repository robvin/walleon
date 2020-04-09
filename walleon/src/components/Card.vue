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

    <Modal
      v-if="this.$slots.modal"
      :isExpanded="isExpanded"
      :origin="$refs.button"
      @close="isExpanded = false"
    >
      <template v-slot:modal>
        <slot name="modal" />
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Modal from "@/components/Modal.vue";

export default Vue.extend({
  name: "Card",

  components: {
    Modal
  },

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
      isExpanded: false as boolean,
      lastX: null as number | null,
      lastY: null as number | null
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
      this.timeoutId = undefined;
      this.lastX = null;
      this.lastY = null;
      document.body.removeEventListener("touchend", this.handleTouchEnd, false);
      document.body.removeEventListener("touchmove", this.handleTouchMove, false);
    },

    handleTouchMove(event: TouchEvent) {
      let movementX = 0;
      let movementY = 0;

      const newX = event.changedTouches[0].clientX;
      const newY = event.changedTouches[0].clientY;

      if (this.lastX !== null && this.lastY !== null) {
        movementX = newX - this.lastX;
        movementY = newY - this.lastY;
      }

      this.lastX = newX;
      this.lastY = newY;

      this.$emit("moved", event, movementX, movementY);
    },

    handleTouchMoveInside(event: TouchEvent) {
      const original = event.target as Node;
      const current = document.elementFromPoint(event.touches[0].pageX, event.touches[0].pageY);

      if (!original.isSameNode(current) || !original.contains(current)) {
        clearTimeout(this.timeoutId);
        this.timeoutId = undefined;
        document.body.removeEventListener("touchmove", this.handleTouchMoveInside, false);
        document.body.removeEventListener("touchend", this.handleTouchEnd, false);
        document.body.removeEventListener("touchcancel", this.handleTouchEnd, false);
        document.body.removeEventListener("touchmove", this.handleTouchMove, false);
      }
    }
  }
});
</script>
