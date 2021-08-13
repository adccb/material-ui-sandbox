/* eslint-disable no-use-before-define */
import React, { useState } from "react";
import useAutocomplete from "@material-ui/lab/useAutocomplete";
import NoSsr from "@material-ui/core/NoSsr";
import styled from "styled-components";

const Label = styled("label")`
  padding: 0 0 4px;
  line-height: 1.5;
  display: block;
`;

const InputWrapper = styled("div")`
  width: 300px;
  border: 1px solid #d9d9d9;
  background-color: #fff;
  border-radius: 4px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;

  &:hover {
    border-color: #40a9ff;
  }

  &.focused {
    border-color: #40a9ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    font-size: 14px;
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`;

const Tag = styled(({ label, onDelete, ...props }) => (
  <div {...props}>
    <span>{label}</span>
  </div>
))`
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: #fafafa;
  border: 1px solid #e8e8e8;
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: #40a9ff;
    background-color: #e6f7ff;
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`;

const Listbox = styled("ul")`
  width: 300px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: #fff;
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;

    & > * {
      display: block;
    }

    & > span:nth-child(2n) {
      color: #777;
      text-align: right;
    }
  }

  & li[aria-selected="true"] {
    background-color: #fafafa;
    font-weight: 600;

    & svg {
      color: #1890ff;
    }
  }

  & li[data-focus="true"] {
    background-color: #e6f7ff;
    cursor: pointer;

    & svg {
      color: #000;
    }
  }
`;

const ChipContainer = styled("div")`
  display: flex;
  width: 100%;
  margin: 0.5rem 0;
`;

const Chip = styled("span")`
  padding: 0.25rem 1rem;
  border: 1px #999 solid;
  background-color: 1px #555 solid;
  border-radius: 1rem;
  transition: background-color 0, 2s ease;

  &:hover {
    color: white;
  }

  &.providers:hover {
    background-color: green;
  }
  &.conditions:hover {
    background-color: red;
  }
`;

const defaultItems = [
  { name: "this is the first item", category: "providers" },
  { name: "this is the second item", category: "providers" },
  { name: "this is the third item", category: "conditions" },
];

export default function CustomizedHook() {
  const [category, setCategory] = useState(null);

  const all = () => setCategory(null);
  const handleChipClick = (newCategory) =>
    category === newCategory ? all() : setCategory(newCategory);

  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: "customized-hook-demo",
    options: category
      ? defaultItems.filter((item) => item.category === category)
      : defaultItems,
    getOptionLabel: (option) => option.name,
  });

  return (
    <NoSsr>
      <div>
        <div {...getRootProps()}>
          <Label {...getInputLabelProps()}>Customized hook</Label>
          <InputWrapper ref={setAnchorEl} className={focused ? "focused" : ""}>
            <input {...getInputProps()} />
          </InputWrapper>
        </div>
        {groupedOptions.length > 0 ? (
          <Listbox {...getListboxProps()}>
            <ChipContainer>
              <Chip
                className="providers"
                onClick={() => handleChipClick("providers")}
              >
                providers
              </Chip>
              <Chip
                className="conditions"
                onClick={() => handleChipClick("conditions")}
              >
                conditions
              </Chip>
            </ChipContainer>

            {groupedOptions.map((option, index) => (
              <li {...getOptionProps({ option, index })}>
                <span>{option.name}</span>
                <span>in {option.category}</span>
              </li>
            ))}
          </Listbox>
        ) : null}
      </div>
    </NoSsr>
  );
}
