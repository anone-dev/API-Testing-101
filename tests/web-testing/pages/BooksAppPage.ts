import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class BooksAppPage extends BasePage {
  // Password modal
  readonly passwordModal: Locator;
  readonly passwordInput: Locator;
  readonly passwordSubmit: Locator;
  readonly passwordError: Locator;

  // Auth section
  readonly emailInput: Locator;
  readonly nameInput: Locator;
  readonly registerButton: Locator;
  readonly tokenDisplay: Locator;

  // Tabs
  readonly booksTab: Locator;
  readonly ordersTab: Locator;

  // Books
  readonly booksList: Locator;
  readonly typeFilter: Locator;
  readonly limitFilter: Locator;
  readonly refreshBooksButton: Locator;
  readonly resetStockButton: Locator;

  // Orders
  readonly orderBookId: Locator;
  readonly orderCustomerName: Locator;
  readonly createOrderButton: Locator;
  readonly ordersList: Locator;

  // Theme
  readonly colorTheme: Locator;

  constructor(page: Page) {
    super(page);
    this.passwordModal = page.getByTestId('password-modal');
    this.passwordInput = page.getByTestId('password-input');
    this.passwordSubmit = page.getByTestId('password-submit');
    this.passwordError = page.getByTestId('password-error');

    this.emailInput = page.getByTestId('email-input');
    this.nameInput = page.getByTestId('name-input');
    this.registerButton = page.getByTestId('register-button');
    this.tokenDisplay = page.getByTestId('token-display');

    this.booksTab = page.getByTestId('books-tab');
    this.ordersTab = page.getByTestId('orders-tab');

    this.booksList = page.getByTestId('books-list');
    this.typeFilter = page.getByTestId('type-filter');
    this.limitFilter = page.getByTestId('limit-filter');
    this.refreshBooksButton = page.getByTestId('refresh-books-button');
    this.resetStockButton = page.getByTestId('reset-stock-button');

    this.orderBookId = page.getByTestId('order-book-id');
    this.orderCustomerName = page.getByTestId('order-customer-name');
    this.createOrderButton = page.getByTestId('create-order-button');
    this.ordersList = page.getByTestId('orders-list');

    this.colorTheme = page.locator('#colorTheme');
  }

  async login(password: string) {
    await this.passwordInput.fill(password);
    await this.passwordSubmit.click();
  }

  async register(email: string, name: string) {
    await this.emailInput.fill(email);
    await this.nameInput.fill(name);
    await this.registerButton.click();
  }

  async filterBooks(type: string, limit?: string) {
    await this.typeFilter.selectOption(type);
    if (limit !== undefined) {
      await this.limitFilter.fill(limit);
      await this.refreshBooksButton.click();
    }
  }

  async createOrder(bookId: string, customerName: string) {
    await this.orderBookId.fill(bookId);
    await this.orderCustomerName.fill(customerName);
    await this.createOrderButton.click();
  }

  bookCard(id: number) {
    return this.page.getByTestId(`book-card-${id}`);
  }

  bookTypeBadge(id: number) {
    return this.page.getByTestId(`book-type-${id}`);
  }

  bookStatusBadge(id: number) {
    return this.page.getByTestId(`book-status-${id}`);
  }

  alertSuccess() {
    return this.page.locator('[data-testid="alert-success"]').last();
  }

  orderItem(id: string) {
    return this.page.getByTestId(`order-item-${id}`);
  }

  allBookCards() {
    return this.page.locator('[data-testid^="book-card-"]');
  }

  allBookTypeBadges() {
    return this.page.locator('[data-testid^="book-type-"]');
  }

  allOrderItems() {
    return this.page.locator('[data-testid^="order-item-"]');
  }
}
