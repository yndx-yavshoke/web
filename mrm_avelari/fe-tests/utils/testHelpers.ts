import { expect } from '@playwright/test';
import { ShokAuthPage } from '../fixtures/pages/ShokAuthPage';
import { ShokRegisterPage } from '../fixtures/pages/ShokRegisterPage';
import { ShokProfilePage } from '../fixtures/pages/ShokProfilePage';
import { ShokEditProfilePage } from '../fixtures/pages/ShokEditProfilePage';
import { ShokMainPage } from '../fixtures/pages/ShokMainPage';

export async function expectAuthPageUI(authPage: ShokAuthPage) {
  await expect(authPage.title).toBeVisible();

  await expect(authPage.emailInput).toBeVisible();
  await expect(authPage.emailPlaceholder).toBeVisible();

  await expect(authPage.passwordInput).toBeVisible();
  await expect(authPage.passwordPlaceholder).toBeVisible();

  await expect(authPage.toLoginButton).toBeVisible();
  await expect(authPage.toBackButton).toBeVisible();
  await expect(authPage.toRegisterButton).toBeVisible();
}

export async function expectRegisterPageUI(registerPage: ShokRegisterPage) {
  await expect(registerPage.title).toBeVisible();

  await expect(registerPage.emailInput).toBeVisible();
  await expect(registerPage.emailPlaceholder).toBeVisible();

  await expect(registerPage.passwordInput).toBeVisible();
  await expect(registerPage.passwordPlaceholder).toBeVisible();

  await expect(registerPage.ageInput).toBeVisible();
  await expect(registerPage.agePlaceholder).toBeVisible();

  await expect(registerPage.toRegisterButton).toBeVisible();
  await expect(registerPage.registerButtonLabel).toBeVisible();
  await expect(registerPage.toBackButton).toBeVisible();
  await expect(registerPage.backButtonLabel).toBeVisible();
}

export async function expectProfilePageUI(profilePage: ShokProfilePage) {
  await expect(profilePage.avatar).toBeVisible();
  await expect(profilePage.name).toBeVisible();
  await expect(profilePage.status).toBeVisible();
  await expect(profilePage.toEditProfileButton).toBeVisible();
  await expect(profilePage.editProfileLabel).toBeVisible();
  await expect(profilePage.toLogoutButton).toBeVisible();
  await expect(profilePage.logoutLabel).toBeVisible();

  await expect(profilePage.galleryImageFirst).toBeVisible();
  await expect(profilePage.galleryImageSecond).toBeVisible();
  await expect(profilePage.galleryImageThird).toBeVisible();
  await expect(profilePage.galleryImageFourth).toBeVisible();

  await expect(profilePage.postsLabel).toBeVisible();
  await expect(profilePage.followersLabel).toBeVisible();
  await expect(profilePage.likesLabel).toBeVisible();

  await expect(profilePage.postsCount).toBeVisible();
  await expect(profilePage.followersCount).toBeVisible();
  await expect(profilePage.likesCount).toBeVisible();
}

export async function expectEditProfilePageUI(editPage: ShokEditProfilePage) {
  await expect(editPage.title).toBeVisible();
  await expect(editPage.labelName).toBeVisible();
  await expect(editPage.inputPlaceholder).toBeVisible();
  await expect(editPage.input).toBeVisible();
  await expect(editPage.saveButtonLabel).toBeVisible();
  await expect(editPage.toSaveButton).toBeVisible();
  await expect(editPage.cancelButtonLabel).toBeVisible();
  await expect(editPage.toCancelButton).toBeVisible();
}

export async function expectMainPageUI(mainPage: ShokMainPage) {
  await expect(mainPage.title).toBeVisible();
  await expect(mainPage.input).toBeVisible();
  await expect(mainPage.inputPlaceholder).toBeVisible();
  await expect(mainPage.checkButton).toBeVisible();
  await expect(mainPage.toLoginButton).toBeVisible();
}
