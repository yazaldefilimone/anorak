export class Letter {
  static bold(letter: string) {
    return `*${letter}*`;
  }

  static italic(letter: string) {
    return `_${letter}_`;
  }

  static stroke(letter: string) {
    return `~${letter}~`;
  }

  static monoSpace(letter: string) {
    return `\`\`\`${letter}\`\`\``;
  }
}
