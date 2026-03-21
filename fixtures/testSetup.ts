import { test as base, Page} from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { users } from "../utils/login_test_data";

type LoginFixtures = {
    loggedInPage: Page;
};

export const test = base.extend<LoginFixtures>({
    loggedInPage: async ({ page }: { page: Page }, use) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login(
            users.standard.username,
            users.standard.password
        );
        await use(page);
    },
});

export { expect } from "@playwright/test";