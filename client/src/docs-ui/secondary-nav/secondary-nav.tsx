import {Component, Host, h, Prop} from "@stencil/core";
import {
  secondaryNavStyle,
  hostStyle,
  searchStyle,
  linkActiveStyle,
} from "./secondary-nav.style";
import {createVNodeFromHyperscriptNode} from "../../utils/hyperscript";
import {pageContext} from "../page/page.context";
import {SelectedFilters} from "../page/page.types";

@Component({tag: "docs-secondary-nav", shadow: false})
export class DocsSecondaryNav {
  /*** the current filter state */
  @Prop() readonly selectedFilters: SelectedFilters;

  render() {
    return (
      <Host class={hostStyle}>
        <amplify-container>
          <div class={secondaryNavStyle}>
            <div>
              <div>
                {[
                  {
                    label: "Getting Started",
                    url: "/start",
                  },
                  {
                    label: "Libraries",
                    url: "/lib",
                  },
                  {
                    label: "CLI",
                    url: "/cli",
                  },
                  {
                    label: "Console",
                    url:
                      "https://docs.aws.amazon.com/amplify/latest/userguide/welcome.html",
                    external: true,
                  },
                  {
                    label: "API Reference",
                    url: (() => {
                      switch (this.selectedFilters?.platform) {
                        case "ios": {
                          return "https://aws-amplify.github.io/aws-sdk-ios/docs/reference/";
                        }
                        case "android": {
                          return "https://aws-amplify.github.io/aws-sdk-android/docs/reference/";
                        }
                        case "js": {
                          return "https://aws-amplify.github.io/amplify-js/api/";
                        }
                      }
                    })(),
                    external: true,
                  },
                ].map(({url, label, external}) =>
                  createVNodeFromHyperscriptNode([
                    external ? "amplify-external-link" : "docs-internal-link",
                    {
                      key: label,
                      href: url,
                      ...(external
                        ? {graphic: "black"}
                        : {childActiveClass: linkActiveStyle}),
                    },
                    ["span", null, label],
                  ]),
                )}
              </div>
              <div class={searchStyle}>
                <div>
                  <input
                    type="search"
                    placeholder="Search"
                    class="three-dee-effect"
                  />
                  <img src="/assets/search.svg" alt="search" />
                </div>
              </div>
            </div>
          </div>
        </amplify-container>
      </Host>
    );
  }
}

pageContext.injectProps(DocsSecondaryNav, ["selectedFilters"]);
