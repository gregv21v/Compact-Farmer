/**
  Item 

  Data:
    name
    position
    size 
    quantity
    imageURL
    elements 
    description
    color
*/


import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: "Test",
  position: {
      x: 100,
      y: 100
  },
  size: 100, 
  quantity: 1,
  imageURL: "",
  elements: {},
  description: "Test Description",
  color: "blue"
};

export const itemSlice = createSlice({
  name: 'item',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    /**
      * consumeOne()
      * @description consumes one of this item
      * @param {Player} player the player that is holding the item in their inventory
      * @param {Inventory} inventory the inventory to consume the item from
      * @param {Slot} slot the slot of the inventory to consume the item from
      * @param {Item} itemStack the item stack to consume the item from
      */
    itemConsumeOne(state, payload) {
      return {
          ...state, quantity: state.quantity-1
      } 
    },

    /**
      * setQuantity()
      * @description sets the quantity of the item
      */
    itemSetQuantity(state, payload) {
      return {
          ...state, quantity: payload
      }
    },

    /**
      * setPosition()
      * @description sets the quantity of the item
      * @param {object} state the previous state of the item
      * @param {object} payload the payload of the object
      * @returns the new item state
      */
    itemSetPosition(state, payload) {
      return {
          ...state, position: payload
      }
    },

    /**
      * setElements()
      * @description sets the value of elements
      * @param {object} state the previous state of the item
      * @param {object} payload the payload of the object
      */
    itemSetElements(state, payload) {
      return {
            ...state, elements: payload
      }
    }
  }
});


export const { 
  itemConsumeOne,
  itemSetQuantity,
  itemSetPosition,
  itemSetElements
} = itemSlice.actions;

export default itemSlice.reducer;


