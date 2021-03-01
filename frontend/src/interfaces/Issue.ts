export default interface Issue {
  title: string;
  id: number;
  html_url: string;
  user: {
    login: string;
    avatar_url: string;
  };
}
