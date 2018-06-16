<template>
  <div class="board">
    <div class="card-container" v-for="emoji in emojis">
      <div v-on:click="openEmoji(emoji)" v-bind:class="{ opened: emoji.opened, matched: emoji.matched}" class="card">
        <div class="side back emoji">{{ emoji.emoji }}</div>
        <div class="side ">Open</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue } from 'vue-property-decorator';
import EmojiType from '@/models/EmojiType';

@Component
export default class Board extends Vue {
  @Prop() private emojis!: EmojiType[];
  prevEmoji : EmojiType;
  openEmoji(emoji : EmojiType) : void {
    if (!emoji.matched) {
      emoji.opened = !emoji.opened;
      this.match(emoji);
    }
  }

  private match(emoji) : boolean {
    setTimeout(() => {
      if (!this.prevEmoji) {
        this.prevEmoji = emoji;
      } else {
        if (this.prevEmoji.emoji === emoji.emoji) {
          this.prevEmoji.matched = emoji.matched = true;
        } else {
          this.prevEmoji.opened = emoji.opened = false;
        }
        this.prevEmoji = null;
      }
    }, 1000);
  }
}
</script>

<style scoped lang="scss">
  .board {
    display: flex;
    flex-flow: row wrap;
    width : 400px;
    justify-content: center;
    align-items: center;
  }
  .matched {
    .emoji {
      opacity: 0.5;
      background: #e3e3e3;
    }
  }
  .card {
    height: 100%;
    position: absolute;
    transform-style: preserve-3d;
    transition: all 1s ease-in-out;
    width: 100%;
    .emoji {
      font-size: 60px;
    }
    .side {
      backface-visibility: hidden;
      height: 100%;
      position: absolute;
      overflow: hidden;
      width: 100%;
      vertical-align: middle;
      line-height: 100px;
      border: 1px solid #ddd;
    }
    .back {
      text-align: center;
      transform: rotateY(180deg);
    }
    &.opened {
      transform: rotateY(180deg);
    }
  }
  .card-container {
      height: 100px;
      width: 100px;
      cursor: pointer;
      perspective: 600;
      position: relative;
  }
</style>
