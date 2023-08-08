/**
 * @typedef {Object} Todo
 * @property {string} body
 * @property {string} colletionId
 * @property {string} colletionName
 * @property {boolean} completed
 * @property {string} created
 * @property {string} id
 * @property {string} title
 * @property {string} updated
 */

/**
 * @typedef {Object} PostTodo
 * @property {string} title
 * @property {string} [body]
 * @property {boolean} [completed]
 */

/**
 * @typedef {"daisy-alert-info" | "daisy-alert-success" | "daisy-alert-warning" | "daisy-alert-error"} ToastStatus
 */

/**
 * @typedef {Object} DispatchParams
 * @property {string} toastMessage
 * @property {ToastStatus} toastStatus
*/

/**
 * @typedef {Object} TodoDeleteDispatchParamsParams
 * @property {string} todoId
 * @typedef {TodoDeleteDispatchParamsParams & DispatchParams} TodoDeleteDispatchParams
 */

/**
 * @template T
 * @typedef {Object} PbResponse
 * @property {T[]} items
 * @property {number} page
 * @property {number} perPage
 * @property {number} totalItems
 * @property {number} totalPages
 */

/** */
export const Types = {};
