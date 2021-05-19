import './ThemePreview.css';

import React, { useState } from 'react';

import { Item, SnackBar } from '../../../components/SnackBar/SnackBar';
import { Text } from '../../../components/Text/Text';
import { defaultVars } from '../../../hooks/useThemeVars/helpers';
import { useThemeVars } from '../../../hooks/useThemeVars/useThemeVars';
import { cn } from '../../cn';
import * as wp from '../../whitepaper/whitepaper';
import { ColorPreview } from '../ColorPreview/ColorPreview';

import {
  bgColors,
  clearControls,
  defaultControls,
  disableControls,
  ghostControls,
  primaryControls,
  scrollbarColors,
  secondaryControls,
  typoColors,
} from './helpers';

const cnCopySnackbar = cn('CopySnackbar');

const varsMap = {
  color: {
    primary: defaultVars.color.primary,
    accent: [],
    invert: [],
  },
  control: [],
  font: [],
  size: [],
  space: [],
} as const;

export const ThemePreview: React.FC = () => {
  const [copiedItems, setCopiedItems] = useState<Item[]>([]);

  const clickHandlerCallback = () => {
    setCopiedItems([
      ...copiedItems,
      {
        key: copiedItems.length + 1,
        message: 'Значение скопировано в буфер обмена',
        status: 'system',
        autoClose: 3,
        onAutoClose: () => {
          setCopiedItems(
            copiedItems.length === 1
              ? []
              : [...copiedItems.filter((item) => copiedItems.length + 1 !== item.key)],
          );
        },
      },
    ]);
  };

  const vars = useThemeVars({
    vars: varsMap,
  });
  const primaryColors = vars.color.primary;

  return (
    <div className={wp.layout()}>
      <SnackBar className={cnCopySnackbar()} items={copiedItems} />
      <div className={wp.layout('content')}>
        <div className={wp.layout('container', { size: 'm' })}>
          <section>
            <Text
              as="h2"
              size="xl"
              view="primary"
              weight="bold"
              className={wp.decorator({ 'indent-b': '3xl' })}
            >
              Цвета фонов
            </Text>
            <div
              className={wp.tplGrid({ 's-ratio': '1-1-1', 'col-gap': 'full', 'row-gap': 'full' })}
            >
              {bgColors.map((item, index) => {
                return (
                  <ColorPreview
                    value={primaryColors[item.color]}
                    color={item.color}
                    description={item.description}
                    key={index}
                    clickHandler={clickHandlerCallback}
                  />
                );
              })}
            </div>
          </section>

          <section>
            <Text
              as="h2"
              size="xl"
              view="primary"
              weight="bold"
              className={wp.decorator({ 'indent-b': '3xl' })}
            >
              Цвета типографики
            </Text>

            <div
              className={wp.tplGrid({ 's-ratio': '1-1-1', 'col-gap': 'full', 'row-gap': 'full' })}
            >
              {typoColors.map((item, index) => {
                return (
                  <ColorPreview
                    value={primaryColors[item.color]}
                    color={item.color}
                    description={item.description}
                    key={index}
                    clickHandler={clickHandlerCallback}
                  />
                );
              })}
            </div>
          </section>

          <section>
            <Text
              as="h2"
              size="xl"
              view="primary"
              weight="bold"
              className={wp.decorator({ 'indent-b': '3xl', 'decorator_indent-t': '6xl' })}
            >
              Цвета скроллбара
            </Text>
            <div
              className={wp.tplGrid({ 's-ratio': '1-1-1', 'col-gap': 'full', 'row-gap': 'full' })}
            >
              {scrollbarColors.map((item, index) => {
                return (
                  <ColorPreview
                    value={primaryColors[item.color]}
                    color={item.color}
                    description={item.description}
                    key={index}
                    clickHandler={clickHandlerCallback}
                  />
                );
              })}
            </div>
          </section>

          <section>
            <Text
              as="h2"
              size="xl"
              view="primary"
              weight="bold"
              className={wp.decorator({ 'indent-b': '3xl', 'decorator_indent-t': '6xl' })}
            >
              Цвета контролов
            </Text>
            <div
              className={wp.tplGrid({ 's-ratio': '1-1-1', 'col-gap': 'full', 'row-gap': 'full' })}
            >
              <section>
                <h3 className="text text_size_l text_view_secondary text_transform_uppercase text_weight-semibold text_spacing_xs decorator decorator_indent-b_xs">
                  Default
                </h3>
                <p className="text text_size_m text_view_secondary decorator decorator_indent-b_3xl decorator_space-b_m decorator_border_b">
                  Цвета для большинства нейтральных контролов
                </p>
                <div className="tpl-grid tpl-grid_col-gap_full tpl-grid_row-gap_full">
                  {defaultControls.map((item, index) => {
                    return (
                      <ColorPreview
                        value={primaryColors[item.color]}
                        color={item.color}
                        description={item.description}
                        key={index}
                        clickHandler={clickHandlerCallback}
                      />
                    );
                  })}
                </div>
              </section>

              <section>
                <h3 className="text text_size_l text_view_secondary text_transform_uppercase text_weight-semibold text_spacing_xs decorator decorator_indent-b_xs">
                  Primary
                </h3>
                <p className="text text_size_m text_view_secondary decorator decorator_indent-b_3xl decorator_space-b_m decorator_border_b">
                  Цвета для акцентных контролов и состояний
                </p>
                <div className="tpl-grid tpl-grid_col-gap_full tpl-grid_row-gap_full">
                  {primaryControls.map((item, index) => {
                    return (
                      <ColorPreview
                        value={primaryColors[item.color]}
                        color={item.color}
                        description={item.description}
                        key={index}
                        clickHandler={clickHandlerCallback}
                      />
                    );
                  })}
                </div>
              </section>

              <section>
                <h3 className="text text_size_l text_view_secondary text_transform_uppercase text_weight-semibold text_spacing_xs decorator decorator_indent-b_xs">
                  Secondary
                </h3>
                <p className="text text_size_m text_view_secondary decorator decorator_indent-b_3xl decorator_space-b_m decorator_border_b">
                  Цвета для второстепенных контролов (преимущественно кнопки)
                </p>
                <div className="tpl-grid tpl-grid_col-gap_full tpl-grid_row-gap_full">
                  {secondaryControls.map((item, index) => {
                    return (
                      <ColorPreview
                        value={primaryColors[item.color]}
                        color={item.color}
                        description={item.description}
                        key={index}
                        clickHandler={clickHandlerCallback}
                      />
                    );
                  })}
                </div>
              </section>

              <section>
                <h3 className="text text_size_l text_view_secondary text_transform_uppercase text_weight-semibold text_spacing_xs decorator decorator_indent-b_xs">
                  Ghost
                </h3>
                <p className="text text_size_m text_view_secondary decorator decorator_indent-b_3xl decorator_space-b_m decorator_border_b">
                  Цвета для третьестепенных контролов, часто идущих в паре с Primary
                </p>
                <div className="tpl-grid tpl-grid_col-gap_full tpl-grid_row-gap_full">
                  {ghostControls.map((item, index) => {
                    return (
                      <ColorPreview
                        value={primaryColors[item.color]}
                        color={item.color}
                        description={item.description}
                        key={index}
                        clickHandler={clickHandlerCallback}
                      />
                    );
                  })}
                </div>
              </section>

              <section>
                <h3 className="text text_size_l text_view_secondary text_transform_uppercase text_weight-semibold text_spacing_xs decorator decorator_indent-b_xs">
                  Clear
                </h3>
                <p className="text text_size_m text_view_secondary decorator decorator_indent-b_3xl decorator_space-b_m decorator_border_b">
                  Цвета для «невидимых» контролов (примущественно кнопки без явной границы)
                </p>
                <div className="tpl-grid tpl-grid_col-gap_full tpl-grid_row-gap_full">
                  {clearControls.map((item, index) => {
                    return (
                      <ColorPreview
                        value={primaryColors[item.color]}
                        color={item.color}
                        description={item.description}
                        key={index}
                        clickHandler={clickHandlerCallback}
                      />
                    );
                  })}
                </div>
              </section>

              <section>
                <h3 className="text text_size_l text_view_secondary text_transform_uppercase text_weight-semibold text_spacing_xs decorator decorator_indent-b_xs">
                  Disable
                </h3>
                <p className="text text_size_m text_view_secondary decorator decorator_indent-b_3xl decorator_space-b_m decorator_border_b">
                  Цвета для недоступных контролов
                </p>
                <div className="tpl-grid tpl-grid_col-gap_full tpl-grid_row-gap_full">
                  {disableControls.map((item, index) => {
                    return (
                      <ColorPreview
                        value={primaryColors[item.color]}
                        color={item.color}
                        description={item.description}
                        key={index}
                        clickHandler={clickHandlerCallback}
                      />
                    );
                  })}
                </div>
              </section>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ColorPreview;
