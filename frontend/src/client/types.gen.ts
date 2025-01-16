// This file is auto-generated by @hey-api/openapi-ts

export type HttpValidationError = {
  detail?: Array<ValidationError>;
};

/**
 * Used when creating an Item.
 */
export type ItemCreate = {
  name: string;
  description?: string | null;
};

/**
 * Used when reading or returning an Item.
 */
export type ItemOut = {
  name: string;
  description?: string | null;
  id: number;
};

export type ValidationError = {
  loc: Array<string | number>;
  msg: string;
  type: string;
};

export type ReadItemsItemsGetData = {
  body?: never;
  path?: never;
  query?: {
    skip?: number;
    limit?: number;
  };
  url: "/items";
};

export type ReadItemsItemsGetErrors = {
  /**
   * Validation Error
   */
  422: HttpValidationError;
};

export type ReadItemsItemsGetError =
  ReadItemsItemsGetErrors[keyof ReadItemsItemsGetErrors];

export type ReadItemsItemsGetResponses = {
  /**
   * Successful Response
   */
  200: Array<ItemOut>;
};

export type ReadItemsItemsGetResponse =
  ReadItemsItemsGetResponses[keyof ReadItemsItemsGetResponses];

export type CreateItemItemsPostData = {
  body: ItemCreate;
  path?: never;
  query?: never;
  url: "/items";
};

export type CreateItemItemsPostErrors = {
  /**
   * Validation Error
   */
  422: HttpValidationError;
};

export type CreateItemItemsPostError =
  CreateItemItemsPostErrors[keyof CreateItemItemsPostErrors];

export type CreateItemItemsPostResponses = {
  /**
   * Successful Response
   */
  200: ItemOut;
};

export type CreateItemItemsPostResponse =
  CreateItemItemsPostResponses[keyof CreateItemItemsPostResponses];

export type DeleteItemItemsItemIdDeleteData = {
  body?: never;
  path: {
    item_id: number;
  };
  query?: never;
  url: "/items/{item_id}";
};

export type DeleteItemItemsItemIdDeleteErrors = {
  /**
   * Validation Error
   */
  422: HttpValidationError;
};

export type DeleteItemItemsItemIdDeleteError =
  DeleteItemItemsItemIdDeleteErrors[keyof DeleteItemItemsItemIdDeleteErrors];

export type DeleteItemItemsItemIdDeleteResponses = {
  /**
   * Successful Response
   */
  200: ItemOut;
};

export type DeleteItemItemsItemIdDeleteResponse =
  DeleteItemItemsItemIdDeleteResponses[keyof DeleteItemItemsItemIdDeleteResponses];

export type ReadItemItemsItemIdGetData = {
  body?: never;
  path: {
    item_id: number;
  };
  query?: never;
  url: "/items/{item_id}";
};

export type ReadItemItemsItemIdGetErrors = {
  /**
   * Validation Error
   */
  422: HttpValidationError;
};

export type ReadItemItemsItemIdGetError =
  ReadItemItemsItemIdGetErrors[keyof ReadItemItemsItemIdGetErrors];

export type ReadItemItemsItemIdGetResponses = {
  /**
   * Successful Response
   */
  200: ItemOut;
};

export type ReadItemItemsItemIdGetResponse =
  ReadItemItemsItemIdGetResponses[keyof ReadItemItemsItemIdGetResponses];
