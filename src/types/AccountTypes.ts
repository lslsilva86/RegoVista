interface Gravatar {
  hash: string;
}

export interface Account {
  avatar: Gravatar;
  name: string;
  userName: string;
  language: string;
}
