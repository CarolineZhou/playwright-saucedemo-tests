import { test, expect } from "../fixtures/testSetup";
import { LoginPage } from "../pages/LoginPage";
import { users } from "../utils/login_test_data";

test("login with valid credential", async({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(users.standard.username, users.standard.password);

  await expect(page).toHaveURL(/inventory/);
});

test("login with invalid credential", async({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(users.invalid.username, users.invalid.password);

  await expect(page.locator("[data-test='error']")).toBeVisible();
});