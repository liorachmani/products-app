import { test, expect, chromium } from "@playwright/test";

test("has title", async () => {
  const browser = await chromium.launch({
    executablePath:
      "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  });

  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("http://localhost:5173/");

  const h1Text = await page.textContent("h1");

  expect(h1Text).toContain("Products");

  await browser.close();
});

test("add product route", async () => {
  const browser = await chromium.launch({
    executablePath:
      "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("http://localhost:5173/");

  await page.getByRole("link", { name: "add" }).click();

  const formElement = await page.$("form");

  expect(formElement).toBeTruthy();

  await browser.close();
});

test("AddProductForm submission", async () => {
  const browser = await chromium.launch({
    executablePath:
      "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("http://localhost:5173/add");

  const formSelector = "form";

  await page.waitForSelector(formSelector);

  await page.fill('input[name="name"]', "Testing");

  await page.getByLabel("Product brand").click();
  await page.getByText("Nike").click();

  await page.getByLabel("Product image").click();
  await page.getByText("shoes").click();

  await page.fill('input[name="price"]', "100");
  await page.fill('input[name="id"]', "123");

  await page.click('button[type="submit"]');

  const successToastText = "Product added";

  await page.waitForSelector(`:is(div:has-text("${successToastText}"))`, {
    timeout: 5000,
  });

  await browser.close();
});
