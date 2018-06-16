<template>
  <div class="home">
    <Board :emojis="emojis"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Board from '@/components/Board.vue'; // @ is an alias to /src
import EmojiType from '@/models/EmojiType';

@Component({
  components: {
    Board,
  },
})
export default class Home extends Vue {
  private allEmojis: string[] = ['👳🏼', '🐼', '🌓', '🌮', '🍼', '🏉',
   '🏠', '☎️', '💊', '💝', '🇮🇳 ', '🚲', '🛳', '🎱', '🎹', '🤽🏻‍♂️'];
  private emojis: EmojiType[] = [];
  private easyGame: number = 16;
  constructor() {
    super();
    const gameEmojis = this.allEmojis.slice(0, this.easyGame / 2);
    const gameEmojisRepeated = [...gameEmojis, ...gameEmojis];
    const gameEmojisRepeatedType: EmojiType[]  = gameEmojisRepeated.map((emoji) => {
      return {emoji, opened: false, matched: false};
    });
    this.emojis = this.shuffleEmojis(gameEmojisRepeatedType);
  }

  private shuffleEmojis(emojis: EmojiType[]): EmojiType[] {
    for (let i = emojis.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = emojis[i];
        emojis[i] = emojis[j];
        emojis[j] = temp;
    }
    return emojis;
  }
}
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>