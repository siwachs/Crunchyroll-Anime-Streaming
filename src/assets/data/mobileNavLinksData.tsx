import { PremiumIcon, SearchIcon, BookmarkIcon, UserIcon } from "../Icons";

interface NavMenuItem {
  to: string;
  text: string;
  isExpandable?: boolean;
}

interface NavAction {
  icon: any;
  to: string;
  alt: string;
}

export const NavActionsList: NavAction[] = [
  {
    icon: PremiumIcon,
    to: "/",
    alt: "premium",
  },
  {
    icon: SearchIcon,
    to: "/",
    alt: "search",
  },
  {
    icon: BookmarkIcon,
    to: "/",
    alt: "bookmark",
  },
  {
    icon: UserIcon,
    to: "/",
    alt: "user",
  },
];

export const BrowseMenu: NavMenuItem[] = [
  {
    to: "/",
    text: "popular",
  },
  {
    to: "/",
    text: "new",
  },
  {
    to: "/",
    text: "alphabetical",
  },
  {
    to: "/",
    text: "Simulcast Season",
  },
  {
    to: "/",
    text: "Release Calendar",
  },
  {
    to: "/",
    text: "Music Videos & Concerts",
  },
];

export const Genres: NavMenuItem[] = [
  {
    to: "/",
    text: "Action",
  },
  {
    to: "/",
    text: "Adventure",
  },
  {
    to: "/",
    text: "Comedy",
  },
  {
    to: "/",
    text: "Drama",
  },
  {
    to: "/",
    text: "Fantasy",
  },
  {
    to: "/",
    text: "Music",
  },
  {
    to: "/",
    text: "Romance",
  },
  {
    to: "/",
    text: "Sci-Fi",
  },
  {
    to: "/",
    text: "Seinen",
  },
  {
    to: "/",
    text: "Shojo",
  },
  {
    to: "/",
    text: "Slice of life",
  },
  {
    to: "/",
    text: "Sports",
  },
  {
    to: "/",
    text: "Supernatural",
  },
  {
    to: "/",
    text: "Thriller",
  },
];

export const ExtraMenu: NavMenuItem[] = [
  {
    to: "/",
    text: "Manga",
  },
  {
    to: "/",
    text: "Games",
  },
];

export const News: NavMenuItem[] = [
  {
    to: "/",
    text: "all news",
  },
  {
    to: "/",
    text: "anime awards",
  },
  {
    to: "/",
    text: "Crunchyroll expo",
  },
  {
    to: "/",
    text: "anime movie night",
  },
];

export const DesktopNavList: NavMenuItem[] = [
  {
    to: "/",
    text: "Browse",
    isExpandable: true,
  },
  {
    to: "/",
    text: "manga",
  },
  {
    to: "/",
    text: "games",
  },
  {
    to: "/",
    text: "news",
    isExpandable: true,
  },
];
