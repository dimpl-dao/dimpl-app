import React from 'react';
import {Col} from 'src/components/core/Col';
import {Div} from 'src/components/core/Div';
import {Row} from 'src/components/core/Row';
import {Span} from 'src/components/core/Span';
import useAutoFocusRef from 'src/hooks/useAutoFocusRef';
import {TextInput} from 'src/components/core/ViewComponents';
import {Platform} from 'react-native';

export const TextField = (props: any) => {
  const {
    label,
    labelStyle,
    note,
    error,
    mt,
    value,
    onChangeText,
    newLineButton,
    onContentSizeChange,
    onSubmitEditing,
    disabled,
    placeholder,
    password,
    leftComp,
    rightComp,
    autoFocus,
    ...others
  } = props;
  const autoFocusRef = useAutoFocusRef();
  return (
    <Div w="100%" mt={mt}>
      {label ? (
        <Span notice styleComp={labelStyle}>
          {label}
        </Span>
      ) : null}
      <Row itemsCenter>
        {leftComp && <Col auto>{leftComp}</Col>}
        <Col>
          <TextInput
            py1={Platform.OS === 'android'}
            mt6={Platform.OS === 'ios'}
            innerRef={autoFocus && autoFocusRef}
            autoCorrect={false}
            multiline={true}
            blurOnSubmit={newLineButton || false}
            {...others}
            styleComp={[
              error && {borderDanger: true},
              disabled && {border: 0, bgGray200: true},
            ]}
            editable={!disabled}
            secureTextEntry={password}
            placeholder={placeholder}
            onChangeText={onChangeText}
            onContentSizeChange={onContentSizeChange}
            onSubmitEditing={onSubmitEditing}
            value={value}
            color={'#000000'}
          />
        </Col>
        {rightComp && <Col auto>{rightComp}</Col>}
      </Row>
      {error ? (
        <Span danger mt2>
          {error}
        </Span>
      ) : (
        note && (
          <Span gray600 mt2>
            {note}
          </Span>
        )
      )}
    </Div>
  );
};
