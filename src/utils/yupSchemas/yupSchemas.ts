/**
 * Schemas Yup
 */

import * as yup from "yup";

export const postTodoSchema = yup.object({
    description: yup.string().required(),
    isComplete: yup.boolean().optional().default(false)
});