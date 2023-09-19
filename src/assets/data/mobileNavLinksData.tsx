import { PremiumIcon, SearchIcon, BookmarkIcon, UserIcon } from "../Icons";

interface MenuItem {
  to: string;
  text: string;
}

interface DesktopNav extends MenuItem {
  isDropDown?: boolean;
  menuType?: string;
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

export const BrowseMenu: MenuItem[] = [
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

export const Genres: MenuItem[] = [
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

export const ExtraMenu: MenuItem[] = [
  {
    to: "/",
    text: "Manga",
  },
  {
    to: "/",
    text: "Games",
  },
];

export const News: MenuItem[] = [
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

export const DesktopNavList: DesktopNav[] = [
  {
    to: "/",
    text: "Browse",
    isDropDown: true,
    menuType: "browse",
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
    isDropDown: true,
    menuType: "news",
  },
];
