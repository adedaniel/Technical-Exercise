import { Button } from "@chakra-ui/button";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, Heading, Stack } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import React, { useEffect, useState } from "react";
import { UseLightTheme } from "../components/useLightTheme";
import { initialItems } from "../data";

export default function Index() {
  const [itemList, setItemList] = useState({});

  useEffect(() => {
    // Once page loads, Mock query request and populate the item list
    setItemList(initialItems);
  }, []);

  const sendPayloadToGQLMutation = (group, item) => {
    const mutationPayload = {
      ...group,
      groupItems: [item],
    };
    // The mutation payload sent to the GQL mutation will look like this:
    //
    // {
    //   groupId: 3,
    //   groupName: "Group 3",
    //   groupItems: [
    //     { itemId: 1, itemName: "Item 1" },
    //   ],
    // },

    makeGroupRequired(mutationPayload); //Send payload to the function that mocks the backend operation
  };

  const makeGroupRequired = (payload) => {
    // Remove group from the optionalItems list
    const newOptionalItems = [...itemList.optionalItems].filter(
      ({ id }) => id == payload.groupId
    );

    // Add payload object to the requiredItems list
    const newRequiredItems = [...itemList.requiredItems, payload];

    setItemList({
      ...itemList,
      requiredItems: newRequiredItems,
      optionalItems: newOptionalItems,
    }); // The function then updates the state of the itemList, just like the way an api response would do.
  };

  return (
    <Flex minH="100vh" justify="center" align="center">
      <UseLightTheme /> {/* To keep the app in light theme */}
      <Stack spacing={6}>
        <Stack>
          <Heading fontSize="xl">Required Items</Heading>
          {itemList.requiredItems?.map((group) => (
            // Map the required items into menu groups
            <Menu key={group.groupId}>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                {group.groupName}
              </MenuButton>
              <MenuList>
                {group.groupItems.map((item) => (
                  <MenuItem key={item.itemId}>{item.itemName}</MenuItem>
                ))}
              </MenuList>
            </Menu>
          ))}
        </Stack>

        <Stack>
          <Heading fontSize="xl">Optional Items</Heading>
          {itemList.optionalItems?.map((group) => (
            // Map the optional items into menu groups
            <Menu key={group.groupId}>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                {group.groupName}
              </MenuButton>
              <MenuList>
                {group.groupItems.map((item) => (
                  <MenuItem
                    key={item.itemId}
                    onClick={() => {
                      // Once an optional item is clicked, prepare the payload for the mocked GQL mutation
                      sendPayloadToGQLMutation(group, item);
                    }}
                  >
                    {item.itemName}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          ))}
        </Stack>
      </Stack>
    </Flex>
  );
}
