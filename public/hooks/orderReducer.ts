// import { OrderItemState, OrderType, TradingEntityType } from "src/domain";
// import { createReducer, Handlers } from "src/hooks-store/action-factory";
// import {
//   generateInitialOrderItemState,
//   initialOrderState,
//   OrderViewModel,
// } from "../models";
// import {
//   OrderAction,
//   OrderActionList,
//   OrderActionNames,
//   OrderActionsUnion,
// } from "./orderActions";

// const OrderHandlers: Handlers<OrderActionNames, OrderViewModel> = {
//   [OrderActionList.SET_ORDER]: (
//     _,
//     action: OrderAction<OrderActionList.SET_ORDER>
//   ) => ({ ...action.payload }),

//   [OrderActionList.SET_CONDITIONALS]: (
//     state,
//     action: OrderAction<OrderActionList.SET_CONDITIONALS>
//   ) => {
//     const stateClone = {
//       ...state,
//       conditionalOrderItems: action.payload.conditionalOrderItems,
//     };

//     if (action.payload.orderItemIdToCancel) {
//       const id = action.payload.orderItemIdToCancel;
//       const index = stateClone.orderItems.findIndex(
//         (oi) => oi.fixedIncomeOrderItemId === id
//       );
//       stateClone.orderItems[index].currentOrderItemState =
//         OrderItemState.Cancelled;
//     }

//     return stateClone;
//   },

//   [OrderActionList.ADD_ORDER_ITEM]: (state) => {
//     const orderItems = [...state.orderItems];
//     orderItems.splice(0, 0, generateInitialOrderItemState());
//     return {
//       ...state,
//       orderItems,
//     };
//   },

//   [OrderActionList.REMOVE_ORDER_ITEM]: (
//     state,
//     action: OrderAction<OrderActionList.REMOVE_ORDER_ITEM>
//   ) => {
//     const orderItems = [...state.orderItems];
//     orderItems.splice(action.payload, 1);
//     return {
//       ...state,
//       orderItems,
//     };
//   },

//   [OrderActionList.SET_TRADING_ENTITY]: (
//     state,
//     action: OrderAction<OrderActionList.SET_TRADING_ENTITY>
//   ) => ({
//     ...state,
//     tradingEntity: action.payload.tradingEntity ?? undefined,
//     relationshipManagerId:
//       action.payload.tradingEntity?.relationshipManagerUserAccountId,
//     authorisedSignatories: action.payload.authorisedSignatories,
//     instructedByParticipant:
//       action.payload.authorisedSignatories.find(
//         (sig) => sig.isDefaultContact
//       ) ?? action.payload.authorisedSignatories[0],
//   }),

//   [OrderActionList.SET_ORDER_TYPE]: (
//     _,
//     action: OrderAction<OrderActionList.SET_ORDER_TYPE>
//   ) => ({
//     ...initialOrderState,
//     orderItems: [generateInitialOrderItemState()],
//     orderType: action.payload.orderType,
//     tradingBooks: action.payload.tradingBooks,
//     supportedTradingEntityTypes:
//       action.payload.orderType === OrderType.CounterParty
//         ? [
//             TradingEntityType.Counterparty,
//             TradingEntityType.InternalCounterparty,
//           ]
//         : [TradingEntityType.Custody, TradingEntityType.ManagedDiscretionary],
//   }),

//   [OrderActionList.SET_RELATIONSHIP_MANAGER_ID]: (
//     state,
//     action: OrderAction<OrderActionList.SET_RELATIONSHIP_MANAGER_ID>
//   ) => ({
//     ...state,
//     relationshipManagerId: action.payload ?? undefined,
//   }),

//   [OrderActionList.SET_INSTRUCTED_BY_PARTICIPANT]: (
//     state,
//     action: OrderAction<OrderActionList.SET_INSTRUCTED_BY_PARTICIPANT>
//   ) => ({
//     ...state,
//     instructedByParticipant: action.payload,
//   }),

//   [OrderActionList.SET_SHOW_VALIDATION_ERRORS]: (
//     state,
//     action: OrderAction<OrderActionList.SET_SHOW_VALIDATION_ERRORS>
//   ) => ({
//     ...state,
//     isShowValidationErrors: action.payload,
//   }),

//   [OrderActionList.SET_ORDER_GROSS_CALCULATION]: (state, action) => {
//     const orderGrossConsiderationItems = [
//       ...state.orderGrossConsiderationItems,
//     ];
//     const index = action.payload.orderItemIdToUpdate
//       ? 0 // new order
//       : orderGrossConsiderationItems.findIndex(
//           (oi) =>
//             oi.orderItemId == action.payload.OrderGrossConsideration.orderItemId
//         );

//     if (
//       action.payload.orderItemIdToUpdate &&
//       !!orderGrossConsiderationItems[index]
//     ) {
//       // new order with existing gross consideration item moving to draft
//       const id = action.payload.orderItemIdToUpdate;
//       orderGrossConsiderationItems[index].orderItemId = id;
//     } else if (index != -1 && !!orderGrossConsiderationItems[index]) {
//       // gross consideration item exists for this order
//       orderGrossConsiderationItems[index] =
//         action.payload.OrderGrossConsideration;
//     } else {
//       // gross consideration item doesn't exist for this order
//       orderGrossConsiderationItems.splice(
//         0,
//         0,
//         action.payload.OrderGrossConsideration
//       );
//     }

//     return {
//       ...state,
//       orderGrossConsiderationItems,
//     };
//   },

//   [OrderActionList.REMOVE_ORDER_GROSS_CALCULATION]: (state, action) => {
//     const orderGrossConsiderationItems = [
//       ...state.orderGrossConsiderationItems,
//     ];
//     const index = orderGrossConsiderationItems.findIndex(
//       (oi) => oi.orderItemId == action.payload
//     );
//     orderGrossConsiderationItems.splice(index, 1);

//     return {
//       ...state,
//       orderGrossConsiderationItems,
//     };
//   },
// };

// type OrderHandlers = typeof OrderHandlers;

// export default createReducer<OrderViewModel, OrderHandlers, OrderActionsUnion>(
//   initialOrderState,
//   OrderHandlers
// );
