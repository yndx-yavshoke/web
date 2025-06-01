/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(app)'}/edit` | `/edit`; params?: Router.UnknownInputParams; } | { pathname: `${'/(app)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `${'/(app)'}/login` | `/login`; params?: Router.UnknownInputParams; } | { pathname: `${'/(app)'}/register` | `/register`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(app)'}/edit` | `/edit`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(app)'}` | `/`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(app)'}/login` | `/login`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(app)'}/register` | `/register`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/_sitemap${`?${string}` | `#${string}` | ''}` | `${'/(app)'}/edit${`?${string}` | `#${string}` | ''}` | `/edit${`?${string}` | `#${string}` | ''}` | `${'/(app)'}${`?${string}` | `#${string}` | ''}` | `/${`?${string}` | `#${string}` | ''}` | `${'/(app)'}/login${`?${string}` | `#${string}` | ''}` | `/login${`?${string}` | `#${string}` | ''}` | `${'/(app)'}/register${`?${string}` | `#${string}` | ''}` | `/register${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(app)'}/edit` | `/edit`; params?: Router.UnknownInputParams; } | { pathname: `${'/(app)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `${'/(app)'}/login` | `/login`; params?: Router.UnknownInputParams; } | { pathname: `${'/(app)'}/register` | `/register`; params?: Router.UnknownInputParams; };
    }
  }
}
