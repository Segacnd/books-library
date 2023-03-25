export enum ActionStatus {
  init,
  loading,
  error,
  success,
}

export enum CardsViewType {
  grid,
  column,
}

export enum SortOrder {
  asc,
  desc,
}

export type Image = {
  url: string;
};

export type Rating = {
  rating: number;
  upRaiting?: (elem: number) => void;
};

export type BookPreview = {
  issueYear: string;
  rating: number;
  title: string;
  authors: string[];
  image: Image | string | null;
  categories: string[];
  id: number;
  booking?: Booking | null;
  delivery?: CurrentUserDelivery | null;
};

export type UserDetails = {
  commentUserId: number;
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
};

export type Comment = {
  id: number;
  rating: number;
  text: string;
  createdAt: Date;
  user: UserDetails;
};

export type Book = {
  id: number;
  title: string;
  rating: number;
  issueYear: string;
  description: string;
  publish: string;
  pages: string;
  cover: string;
  weight: string;
  format: string;
  ISBN: string;
  producer: string;
  authors: string[];
  images: Image[];
  categories: string[];
  comments: Comment[];
  booking?: Booking;
  delivery?: CurrentUserDelivery | null;
};

export type Category = {
  name: string;
  path: string;
  id: number;
};

export type Booking = {
  customerFirstName: string;
  customerId: number;
  customerLastName: string;
  dateOrder: string;
  id: number;
  order: true;
};

export type User = {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: Date;
  updatedAt: Date;
  firstName: string;
  lastName: string;
  phone: string;
};
export type DataAuth = {
  jwt: string;
  user: User;
};
export type UserAuth = {
  identifier: string;
  password: string;
};

export type AuthError = {
  status: number;
  name: string;
  message: string;
};

export type AuthResponse = {
  user: User;
  jwt: string;
};

export type AuthErrorResponse = {
  error: AuthError;
  errorStatusCode: number;
};
export type RegistrationData = {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
};

export type ResetPasswordRequest = {
  password: string;
  passwordConfirmation: string;
  code: string;
};

export type BookingState = {
  bookingData: BookingRequest;
  status: ActionStatus;
};
export type BookingRequest = {
  order: boolean;
  dateOrder: string;
  book: string;
  customer: string;
};

export type Review = {
  rating: number;
  text: string;
  book: string;
  user: string;
};

export type RequestReview = {
  data: Review;
};

export type LoginForm = {
  identifier: string;
  password: string;
};

export type MailForm = {
  email: string;
};

export type IFormStatusModal = {
  title: string;
  message: string;
  buttonLabel?: string;
  handleButtonClick?: () => void;
};

export type IHighlight = {
  text: string;
  query: string | string[];
};

export type IHightlightedData = {
  hightlight: boolean;
  text: string;
};

export type RegisterForm = {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastname: string;
  phone: string;
};

export type IRegForm = {
  currentStep: number;
  handleStep: () => void;
};

export type IResetPasswordData = {
  password: string;
  passwordConfirmation: string;
};

export type IResetPasswordForm = {
  code: string;
};

export type IRegistrationFormContext = {
  data: any;
  setFormValues: (values: any) => void;
};

export type ResetPasswordType = {
  code: string;
};

export type IHighlightt = {
  text: string;
};

export type ProtectionRouteType = {
  children: JSX.Element;
};
export type FormButtonTypes = {
  value: string;
  handleStep?: () => void;
  disabled: boolean;
};

export type Role = {
  id: number;
  name: User;
  description: string;
  type: string;
};
export type CurrentUserComment = {
  id: number;
  rating: number;
  text: string | null;
  bookId: number;
};

export type ChangeDataForm = {
  login: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email: string;
};

export type CurrentUserBook = {
  id: number;
  title: string;
  rating: number;
  issueYear: string;
  authors: string[];
  image: Image | string | null;
};

export type CurrentUserBooking = {
  id: number;
  order: boolean;
  dateOrder: string;
  book: CurrentUserBook;
};

export type CurrentUserDelivery = {
  id: number;
  nahded: boolean;
  dateHandedFrom: string;
  dateHandedTo: string;
  book: CurrentUserBook;
};

export type CurrentUserHistory = {
  id: number;
  books: CurrentUserBook[];
};

export type CurrentUser = {
  id: number;
  username: string;
  email: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: Role;
  comments: CurrentUserComment[];
  avatar: string;
  booking: CurrentUserBooking;
  delivery: CurrentUserDelivery;
  history: CurrentUserHistory;
};

export type UserBookInfoTypes = {
  title: string;
  subTitle: string;
  emptyContentText: string;
  content: JSX.Element | null;
  alertStatus?: ActionStatus;
  alertText?: JSX.Element;
  dataTestId?: string;
};
