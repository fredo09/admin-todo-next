/**
 * Schemas Yup
 */

import * as yup from "yup";

export const postTodoSchema = yup.object({
    description: yup.string().required(),
    isComplete: yup.boolean().optional().default(false)
});

export const putTodoSchema = yup.object({
    description: yup.string().optional(),
    isComplete: yup.boolean().optional()
});