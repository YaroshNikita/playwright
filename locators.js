// Shared helpers for Playwright locators
const loginLocators = {
  emailInput: (page) => page.locator('input').nth(0),
  passwordInput: (page) => page.locator('input').nth(1),
  loginButton: (page) => page.locator('button[type="submit"]'),
};

const ssoLocators = {
  providersHeading: '._Typography_1ki3q_1._HeadingNine_1ki3q_50._Text_3jgwx_17._BuenosAires_1ki3q_100',
};

const assignmentLocators = {
  newAssignmentButton: (page) => page.getByTestId('new-assignment-btn'),
  BookOption: (page) => page.getByText('Nikita book', { exact: true }),
  chapterOption: (page) => page.getByText('1. test', { exact: true }),
  sectionOption: (page) => page.getByText('1. Super assignment', { exact: true }),
  selectAllProblemsCheckbox: (page) => page.getByRole('checkbox', { name: 'Super assignment' }),
  assignmentNameInput: (page) => page.getByTestId('assignment-name-input'),
  classCheckbox: (page) => page.getByRole('checkbox', { name: 'auto' }),
  createAssignmentSubmitButton: (page) => page.getByTestId('create-assignment-submit-btn'),
  assignmentCard: (page) => page.getByTestId('Super assignment-assignment'),
  assignmentOptionsButton: (page) => page.getByTestId('Super assignment-assignment-options-btn').nth(0),
  deleteAssignmentButton: (page) => page.getByTestId('Super assignment-delete-exercise-btn'),
  confirmDeleteAssignmentButton: (page) => page.getByTestId('confirm-delete-exercise-btn'),
};

module.exports = {
  loginLocators,
  ssoLocators,
  assignmentLocators,
};