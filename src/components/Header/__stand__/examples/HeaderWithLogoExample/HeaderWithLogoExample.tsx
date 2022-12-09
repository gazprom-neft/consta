import './HeaderWithLogoExample.css';

import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { IconChatStroked } from '../../../../../icons/IconChatStroked/IconChatStroked';
import { IconRing } from '../../../../../icons/IconRing/IconRing';
import { cn } from '../../../../../utils/bem';
import {
  Header,
  HeaderButton,
  HeaderLogin,
  HeaderLogo,
  HeaderMenu,
  HeaderModule,
  HeaderSearchBar,
} from '../../../Header';
import {
  SearchBarPropOnChange,
  SearchBarPropOnSearch,
} from '../../../SearchBar/HeaderSearchBar';

const cnExample = cn('HeaderWithLogoExample');

export function HeaderWithLogoExample() {
  const [value, setValue] = useState<string | null>(null);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const handleChange: SearchBarPropOnChange = ({ value }) => setValue(value);
  // eslint-disable-next-line no-alert
  const handleSearch: SearchBarPropOnSearch = ({ value }) =>
    alert(`Произведен поиск, запрос - ${value} `);
  const handleLogin = () => setIsLogged(!isLogged);

  const menuItems = [
    {
      label: 'Проекты',
      href: '#projects',
      active: true,
    },
    {
      label: 'Задачи',
      href: '#tasks',
    },
    {
      label: 'Еще',
      onClick: () => alert('Еще'),
    },
  ];

  return (
    <Example col={1}>
      <Header
        className={cnExample()}
        leftSide={
          <>
            <HeaderModule>
              <HeaderLogo>
                <svg width="143" height="32" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0)" fill="#006FBA">
                    <path d="M84.685 14.002c.562-2.758.832-3.446 1.403-4.009.432-.436.945-.639 1.688-.639.666 0 1.188.203 1.507.599.243.306.382.805.382 1.278 0 .193 0 .355-.036.59h-1.354c.036-.194.036-.347.036-.514 0-.41-.14-.742-.639-.742-.279 0-.486.09-.652.27-.356.369-.522.918-.981 3.167-.23 1.161-.383 2.106-.383 2.66 0 .499.194.778.653.778.32 0 .535-.126.702-.333.202-.243.333-.535.423-.931h1.368c-.194.918-.473 1.494-1 1.952-.395.347-.854.522-1.62.522-.791 0-1.277-.27-1.57-.729-.229-.369-.305-.701-.305-1.25 0-.55.135-1.431.378-2.669zM91.9 10.668h-1.444l.243-1.215h4.243l-.243 1.215h-1.444l-1.57 7.879H90.33l1.57-7.879zM95.964 9.453h2.056c.715 0 1.138.14 1.467.473.306.306.423.755.423 1.237 0 .32-.027.652-.104 1.062-.445 2.236-1.3 2.771-2.681 2.771h-.918l-.702 3.55H94.15l1.814-9.093zm1.224 4.333c.701 0 1.034-.41 1.264-1.557.05-.256.103-.562.103-.792 0-.508-.202-.764-.778-.764h-.702l-.625 3.118h.737v-.005zM101.571 9.453h3.627l-.243 1.215h-2.273l-.535 2.695h1.953l-.243 1.202h-1.953l-.549 2.771h2.272l-.243 1.21h-3.626l1.813-9.093zM106.425 9.453h1.223l.716 4.702 2.605-4.702h1.228l-1.813 9.094h-1.354l1.125-5.643-1.89 3.613h-.756l-.409-3.64-1.134 5.67h-1.355l1.814-9.094zM113.692 9.453h1.355l-1.098 5.467 3.091-5.467h1.152l-1.818 9.094h-1.35l1.084-5.454-3.041 5.454h-1.188l1.813-9.094zM119.684 9.453h1.224l.716 4.702 2.605-4.702h1.228l-1.813 9.094h-1.354l1.124-5.643-1.889 3.613h-.756l-.41-3.64-1.134 5.67h-1.354l1.813-9.094zM125.818 14.002c.562-2.758.828-3.446 1.404-4.009.432-.436.945-.639 1.687-.639.666 0 1.188.203 1.507.599.243.306.383.805.383 1.278 0 .193 0 .355-.036.59h-1.354c.036-.194.036-.347.036-.514 0-.41-.14-.742-.639-.742a.834.834 0 00-.653.27c-.355.369-.522.918-.985 3.167-.23 1.161-.383 2.106-.383 2.66 0 .499.194.778.653.778a.844.844 0 00.702-.333c.202-.243.333-.535.423-.931h1.367c-.193.918-.472 1.494-.994 1.952-.396.347-.855.522-1.624.522-.792 0-1.278-.27-1.57-.729-.23-.369-.306-.701-.306-1.25 0-.55.139-1.431.382-2.669zM132.329 14.461c-.513-.32-.661-.841-.661-1.444 0-.23.04-.513.112-.882.446-2.21 1.139-2.682 2.736-2.682h2.182l-1.826 9.094h-1.355l.765-3.78h-.715l-1.944 3.78h-1.48l2.186-4.086zm.716-1.624c0 .549.216.765.765.765h.702l.584-2.938h-.728c-.702 0-1.022.36-1.238 1.466-.045.248-.085.49-.085.707zM83.635 22.182h1.355l-1.813 9.094h-1.355l1.813-9.094zm.5 4.423l2.785-4.418h1.507l-2.888 4.405 1.215 4.688h-1.48l-1.139-4.675zM91.684 22.182h4.01l-.244 1.215h-2.654l-.46 2.326h.716c.716 0 1.139.153 1.467.486.306.306.423.742.423 1.238 0 .319-.04.728-.103 1.061-.446 2.237-1.305 2.772-2.682 2.772H89.87l1.813-9.098zm.536 7.883c.702 0 1.021-.396 1.264-1.557.05-.243.09-.562.09-.805 0-.513-.193-.765-.765-.765h-.715l-.626 3.127h.752zM97.583 22.708c.446-.436.959-.625 1.687-.625.819 0 1.314.279 1.598.756.229.355.306.675.306 1.215 0 .562-.14 1.444-.396 2.681-.563 2.772-.806 3.451-1.404 4.023-.432.432-.945.625-1.674.625-.832 0-1.327-.279-1.61-.751-.217-.36-.293-.68-.293-1.215 0-.562.14-1.444.382-2.682.576-2.776.82-3.455 1.404-4.027zm2.236 1.377c0-.459-.166-.792-.675-.792a.857.857 0 00-.639.27c-.332.333-.521.932-.971 3.168-.23 1.147-.396 2.106-.396 2.646 0 .459.166.792.68.792.256 0 .458-.09.638-.27.333-.333.522-.932.972-3.168.225-1.152.391-2.11.391-2.646zM100.576 30.065h.126c.742 0 1.223-.459 1.7-2.835l1.022-5.044h4.112l-1.813 9.094h-1.368l1.57-7.883h-1.444l-.778 3.883c-.689 3.473-1.391 4-2.965 4h-.41l.248-1.215zM109.03 22.182h1.354l-.702 3.537h.716c.715 0 1.138.153 1.467.486.306.306.423.742.423 1.237 0 .32-.041.729-.104 1.062-.445 2.236-1.305 2.771-2.681 2.771h-2.286l1.813-9.093zm.536 7.883c.701 0 1.021-.396 1.264-1.557.049-.243.09-.562.09-.805 0-.513-.194-.765-.765-.765h-.715l-.626 3.127h.752zM114.677 22.182h1.354l-1.57 7.883h1.493l1.571-7.883h1.354l-1.57 7.883h1.494l1.57-7.883h1.354l-1.813 9.094h-7.051l1.814-9.094zM123.235 22.182h3.627l-.243 1.215h-2.272l-.54 2.695h1.957l-.243 1.202h-1.957l-.545 2.771h2.272l-.243 1.21h-3.626l1.813-9.093zM128.085 22.182h1.228l.715 4.702 2.606-4.702h1.228l-1.818 9.094h-1.35l1.121-5.643-1.89 3.613h-.751l-.41-3.64-1.138 5.67h-1.355l1.814-9.094zM133.593 30.065c.752 0 1.085-.202 1.391-.931l.355-.82-.652-6.128h1.381l.243 4.293 1.953-4.293h1.444l-3.68 7.344c-.702 1.403-.995 1.75-2.669 1.75l.234-1.215zM139.275 29.719h1.467l-.306 1.556h-1.467l.306-1.556zm1.507-7.537h1.458l-1.354 6.565h-1.278l1.174-6.565z" />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M53.629 19.02c.252 0 .463-.194.463-.433v-7.361l-.004-.036c-.023-.211-.22-.382-.464-.382a.452.452 0 00-.459.382V18.574l-.004.013c0 .239.211.432.468.432zm.864-9.567c1.466 0 1.561 1.188 1.561 1.949v7.014c0 .765-.09 1.953-1.561 1.953H52.76c-1.466 0-1.556-1.188-1.556-1.953v-7.014c0-.765.09-1.949 1.556-1.949h1.733zm-32.67 0h4v1.355h-1.904v9.556h-2.097V9.454zm5.399 0h3.293l1.094 10.912H29.56l-.193-2.903h-.99l-.198 2.902h-2.047l1.089-10.91zm2.065 6.813l-.36-5.458h-.117l-.365 5.457h.842zm5.327.278v2.052c0 .284.207.36.329.36.193 0 .328-.17.328-.36v-2.533c0-.342-.058-.715-.837-.715h-.85v-1.202h.882c.598 0 .81-.144.81-.81v-2.168c0-.19-.135-.36-.329-.36-.121 0-.328.076-.328.36v1.777h-2.102v-1.543c0-.765.095-1.949 1.557-1.949h1.737c1.467 0 1.557 1.188 1.557 1.949v1.75c0 1.183-.797 1.507-1.427 1.476v.112c1.409-.036 1.427 1.089 1.427 1.48v2.196c0 .765-.09 1.953-1.557 1.953h-1.737c-1.467 0-1.557-1.188-1.557-1.953v-1.872h2.097zm4.13-7.09H43.6v10.91h-1.958v-9.556h-.94v9.556h-1.953V9.454h-.004zm6.372 0h3.294c1.466 0 1.7 1.187 1.7 1.948v3.302c0 .765-.234 1.953-1.7 1.953h-1.197v3.707h-2.097V9.454zm2.645 6.002c.23 0 .392-.203.392-.545v-3.554c0-.342-.162-.545-.392-.545h-.553v4.648h.553v-.004zm14.98-6.003h2.726v10.912H63.37V13.52h-.072l-1.08 6.843H60.54l-1.075-6.843h-.072v6.843H57.29V9.454h2.723l1.358 7.666 1.368-7.667zm-45.387 1.112a18.11 18.11 0 00-.625-4.945c-.54-1.962-1.593-3.83-1.746-4.068-.153.243-.985 1.755-1.719 4.126-.193.711-.54 2.255-.603 3.757-.072 1.823.176 3.631.275 4.144 0-.603.013-2.614.387-4.274.373-1.665 1.084-3.577 1.66-4.55.625 1.027 1.409 3.236 1.683 4.559.279 1.327.423 3.019.364 4.22.167-.697.297-1.867.324-2.97zm-2.362 8.468a7.591 7.591 0 00.864-3.74c-.072-1.777-.67-3.082-.855-3.392-.207.31-.904 1.804-.89 3.555.053 1.795.557 2.965.881 3.577zm2.551-13.39c.657 2.897.648 4.679.36 6.712-.517 3.659-2.182 6.457-2.902 7.398-.495-.64-1.25-1.94-1.755-3.15 0 0-.954-2.308-1.206-4.558-.251-2.25-.143-4.54.59-7.114C13.31 2.62 14.632.54 14.992 0c.23.382 1.89 2.745 2.551 5.642zm1.36 14.721v7.465a10.916 10.916 0 01-7.974 3.447C4.895 31.28 0 26.403 0 20.39c0-6.006 4.895-10.88 10.93-10.88v8.185a6.129 6.129 0 00-5.09 2.7 6.101 6.101 0 00.752 7.735 6.148 6.148 0 008.661.013c.005-.009.014-.009.018-.013v-.01l.018-.013a3.044 3.044 0 000-4.324 3.074 3.074 0 00-4.342 0c-.009.005-.013.005-.013.014v-3.429h7.968v-.005zm44.607 7.848c0-.95-.4-1.202-1.49-1.202h-.184v-1.827h-1.107v4.738h1.107c1.201 0 1.674-.184 1.674-1.224v-.485zm-9.233-3.033h-2.785v.9h.9v3.847h1.052v-3.847h.837v-.9h-.004zm-8.513 1.57c0-.967-.473-1.215-1.58-1.215v-.355H43.11v.355c-1.111 0-1.584.248-1.584 1.215v1.48c0 .963.495 1.22 1.584 1.22v.468h1.075v-.468c1.09 0 1.58-.257 1.58-1.22v-1.48zm-10.03-1.57H33.08v4.747h2.654v-.9h-1.511V27.91h1.354v-.9h-1.354v-.936h1.511v-.895zm-9.174.004h-1.107v1.827h-.567v-1.827H23.78v4.738h1.107v-2.074h.567v2.074h1.107v-4.738zm38.907 6.097H21.822V24h43.645v7.28zM42.6 26.718c0-.275.09-.347.333-.347h.18v2.205h-.18c-.243 0-.333-.063-.333-.342v-1.516zm19.478 1.129c.247 0 .324.063.324.333v.571c0 .27-.077.333-.324.333h-.248v-1.237h.248zM44.36 26.371c.247 0 .333.054.333.338v1.525c0 .279-.086.346-.333.346h-.175v-2.204h.175"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M62.74 9.453h2.726V20.37H63.37v-6.844h-.072l-1.08 6.844H60.54l-1.076-6.844h-.072v6.844h-2.101V9.453h2.722l1.359 7.672 1.368-7.672z"
                    />
                    <path d="M73.647 8.738l2.321 11.63L73.646 32h1.071l2.322-11.631-2.322-11.631h-1.07z" />
                  </g>
                  <defs>
                    <clipPath id="clip0">
                      <path fill="#fff" d="M0 0h142.241v32H0z" />
                    </clipPath>
                  </defs>
                </svg>
              </HeaderLogo>
            </HeaderModule>
            <HeaderModule indent="l">
              <HeaderSearchBar
                placeholder="я ищу"
                label="поиск"
                value={value}
                onChange={handleChange}
                onSearch={handleSearch}
              />
            </HeaderModule>
            <HeaderModule indent="l">
              <HeaderMenu items={menuItems} />
            </HeaderModule>
          </>
        }
        rightSide={
          <>
            <HeaderModule indent="s">
              <HeaderButton iconLeft={IconChatStroked} />
            </HeaderModule>
            <HeaderModule indent="s">
              <HeaderButton iconLeft={IconRing} />
            </HeaderModule>
            <HeaderModule indent="s">
              <HeaderLogin
                isLogged={isLogged}
                personName="Вадим Матвеев"
                personInfo="В другом офисе"
                personStatus="available"
                onClick={handleLogin}
                className={cnExample('Login', { isLogged })}
              />
            </HeaderModule>
          </>
        }
      />
    </Example>
  );
}
