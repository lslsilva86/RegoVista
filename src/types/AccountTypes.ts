interface Gravatar {
  hash: string;
}

export interface Account {
  avatar: Gravatar;
  id: number;
  name: string;
}
