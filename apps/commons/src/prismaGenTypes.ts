
/**
 * Client
**/

import * as runtime from '@prisma/client/runtime/index';
declare const prisma: unique symbol
export type PrismaPromise<A> = Promise<A> & {[prisma]: true}
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};


/**
 * Model user
 * 
 */
export type user = {
  id: string
  first_name: string
  last_name: string
  email: string
  hashed_password: string
  is_banned: boolean
  created_time: Date
  last_token_generated_at: Date
}

/**
 * Model workout
 * 
 */
export type workout = {
  id: string
  name: string
  category: workout_type
  target_body_part: body_part | null
  intensity: intensity_levels | null
  owner_id: string
  is_public: boolean
}

/**
 * Model session_schema
 * 
 */
export type session_schema = {
  id: string
  name: string
  owner_id: string
}

/**
 * Model workout_schema
 * 
 */
export type workout_schema = {
  id: string
  session_schema_id: string
  workout_id: string
  default_target: Prisma.JsonValue
  order: number
}

/**
 * Model superset_schema
 * 
 */
export type superset_schema = {
  id: string
  name: string
  session_schema_id: string
}

/**
 * Model superset_workout_schema
 * 
 */
export type superset_workout_schema = {
  id: string
  superset_schema_id: string
  workout_id: string
  default_target: Prisma.JsonValue
  order: number
}

/**
 * Model session_instance
 * 
 */
export type session_instance = {
  id: string
  session_schema_id: string
  start_timestamp: Date
  end_timestamp: Date | null
}

/**
 * Model workout_instance
 * 
 */
export type workout_instance = {
  workout_schema_id: string
  session_instance_id: string
  sets_data: Prisma.JsonValue
}

/**
 * Model superset_workout_instance
 * 
 */
export type superset_workout_instance = {
  superset_workout_schema_id: string
  session_instance_id: string
  sets_data: Prisma.JsonValue
}


/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export const workout_type: {
  WEIGHT_AND_REPS: 'WEIGHT_AND_REPS',
  REPS: 'REPS',
  DISTANCE_AND_DURATION: 'DISTANCE_AND_DURATION',
  DURATION: 'DURATION'
};

export type workout_type = (typeof workout_type)[keyof typeof workout_type]


export const body_part: {
  LEGS: 'LEGS',
  SHOULDER: 'SHOULDER',
  INNER_CHEST: 'INNER_CHEST',
  OUTER_CHEST: 'OUTER_CHEST',
  ABS: 'ABS'
};

export type body_part = (typeof body_part)[keyof typeof body_part]


export const intensity_levels: {
  VERY_HARD: 'VERY_HARD',
  HARD: 'HARD',
  MEDIUM: 'MEDIUM',
  EASY: 'EASY',
  WARMUP: 'WARMUP'
};

export type intensity_levels = (typeof intensity_levels)[keyof typeof intensity_levels]


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
      /**
       * @private
       */
      private fetcher;
      /**
       * @private
       */
      private readonly dmmf;
      /**
       * @private
       */
      private connectionPromise?;
      /**
       * @private
       */
      private disconnectionPromise?;
      /**
       * @private
       */
      private readonly engineConfig;
      /**
       * @private
       */
      private readonly measurePerformance;

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends PrismaPromise<any>[]>(arg: [...P]): Promise<UnwrapTuple<P>>;

  $transaction<R>(fn: (prisma: Prisma.TransactionClient) => Promise<R>, options?: { maxWait?: number, timeout?: number }): Promise<R>;

      /**
   * `prisma.user`: Exposes CRUD operations for the **user** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.userDelegate<GlobalReject>;

  /**
   * `prisma.workout`: Exposes CRUD operations for the **workout** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Workouts
    * const workouts = await prisma.workout.findMany()
    * ```
    */
  get workout(): Prisma.workoutDelegate<GlobalReject>;

  /**
   * `prisma.session_schema`: Exposes CRUD operations for the **session_schema** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Session_schemas
    * const session_schemas = await prisma.session_schema.findMany()
    * ```
    */
  get session_schema(): Prisma.session_schemaDelegate<GlobalReject>;

  /**
   * `prisma.workout_schema`: Exposes CRUD operations for the **workout_schema** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Workout_schemas
    * const workout_schemas = await prisma.workout_schema.findMany()
    * ```
    */
  get workout_schema(): Prisma.workout_schemaDelegate<GlobalReject>;

  /**
   * `prisma.superset_schema`: Exposes CRUD operations for the **superset_schema** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Superset_schemas
    * const superset_schemas = await prisma.superset_schema.findMany()
    * ```
    */
  get superset_schema(): Prisma.superset_schemaDelegate<GlobalReject>;

  /**
   * `prisma.superset_workout_schema`: Exposes CRUD operations for the **superset_workout_schema** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Superset_workout_schemas
    * const superset_workout_schemas = await prisma.superset_workout_schema.findMany()
    * ```
    */
  get superset_workout_schema(): Prisma.superset_workout_schemaDelegate<GlobalReject>;

  /**
   * `prisma.session_instance`: Exposes CRUD operations for the **session_instance** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Session_instances
    * const session_instances = await prisma.session_instance.findMany()
    * ```
    */
  get session_instance(): Prisma.session_instanceDelegate<GlobalReject>;

  /**
   * `prisma.workout_instance`: Exposes CRUD operations for the **workout_instance** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Workout_instances
    * const workout_instances = await prisma.workout_instance.findMany()
    * ```
    */
  get workout_instance(): Prisma.workout_instanceDelegate<GlobalReject>;

  /**
   * `prisma.superset_workout_instance`: Exposes CRUD operations for the **superset_workout_instance** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Superset_workout_instances
    * const superset_workout_instances = await prisma.superset_workout_instance.findMany()
    * ```
    */
  get superset_workout_instance(): Prisma.superset_workout_instanceDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Prisma Client JS version: 3.15.2
   * Query Engine version: 461d6a05159055555eb7dfb337c9fb271cbd4d7e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: 'DbNull'

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: 'JsonNull'

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: 'AnyNull'

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = {
    [key in keyof T]: T[key] extends false | undefined | null ? never : key
  }[keyof T]

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Buffer
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Exact<A, W = unknown> = 
  W extends unknown ? A extends Narrowable ? Cast<A, W> : Cast<
  {[K in keyof A]: K extends keyof W ? Exact<A[K], W[K]> : never},
  {[K in keyof W]: K extends keyof A ? Exact<A[K], W[K]> : W[K]}>
  : never;

  type Narrowable = string | number | boolean | bigint;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: Exact<S, V>) => S;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T

  class PrismaClientFetcher {
    private readonly prisma;
    private readonly debug;
    private readonly hooks?;
    constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
    sanitizeMessage(message: string): string;
    protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
  }

  export const ModelName: {
    user: 'user',
    workout: 'workout',
    session_schema: 'session_schema',
    workout_schema: 'workout_schema',
    superset_schema: 'superset_schema',
    superset_workout_schema: 'superset_workout_schema',
    session_instance: 'session_instance',
    workout_instance: 'workout_instance',
    superset_workout_instance: 'superset_workout_instance'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends RejectOnNotFound
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     *  * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your prisma.schema file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  export type Hooks = {
    beforeRequest?: (options: { query: string, path: string[], rootField?: string, typeName?: string, document: any }) => any
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'

  /**
   * These options are being passed in to the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;


  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */


  export type UserCountOutputType = {
    workout: number
    session_schema: number
  }

  export type UserCountOutputTypeSelect = {
    workout?: boolean
    session_schema?: boolean
  }

  export type UserCountOutputTypeGetPayload<
    S extends boolean | null | undefined | UserCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? UserCountOutputType
    : S extends undefined
    ? never
    : S extends UserCountOutputTypeArgs
    ?'include' extends U
    ? UserCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof UserCountOutputType ? UserCountOutputType[P] : never
  } 
    : UserCountOutputType
  : UserCountOutputType




  // Custom InputTypes

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     * 
    **/
    select?: UserCountOutputTypeSelect | null
  }



  /**
   * Count Type WorkoutCountOutputType
   */


  export type WorkoutCountOutputType = {
    workout_schema: number
    superset_workout_schema: number
  }

  export type WorkoutCountOutputTypeSelect = {
    workout_schema?: boolean
    superset_workout_schema?: boolean
  }

  export type WorkoutCountOutputTypeGetPayload<
    S extends boolean | null | undefined | WorkoutCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? WorkoutCountOutputType
    : S extends undefined
    ? never
    : S extends WorkoutCountOutputTypeArgs
    ?'include' extends U
    ? WorkoutCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof WorkoutCountOutputType ? WorkoutCountOutputType[P] : never
  } 
    : WorkoutCountOutputType
  : WorkoutCountOutputType




  // Custom InputTypes

  /**
   * WorkoutCountOutputType without action
   */
  export type WorkoutCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the WorkoutCountOutputType
     * 
    **/
    select?: WorkoutCountOutputTypeSelect | null
  }



  /**
   * Count Type Session_schemaCountOutputType
   */


  export type Session_schemaCountOutputType = {
    workout_schema: number
    superset_schema: number
    session_instance: number
  }

  export type Session_schemaCountOutputTypeSelect = {
    workout_schema?: boolean
    superset_schema?: boolean
    session_instance?: boolean
  }

  export type Session_schemaCountOutputTypeGetPayload<
    S extends boolean | null | undefined | Session_schemaCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? Session_schemaCountOutputType
    : S extends undefined
    ? never
    : S extends Session_schemaCountOutputTypeArgs
    ?'include' extends U
    ? Session_schemaCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof Session_schemaCountOutputType ? Session_schemaCountOutputType[P] : never
  } 
    : Session_schemaCountOutputType
  : Session_schemaCountOutputType




  // Custom InputTypes

  /**
   * Session_schemaCountOutputType without action
   */
  export type Session_schemaCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the Session_schemaCountOutputType
     * 
    **/
    select?: Session_schemaCountOutputTypeSelect | null
  }



  /**
   * Count Type Workout_schemaCountOutputType
   */


  export type Workout_schemaCountOutputType = {
    workout_instance: number
  }

  export type Workout_schemaCountOutputTypeSelect = {
    workout_instance?: boolean
  }

  export type Workout_schemaCountOutputTypeGetPayload<
    S extends boolean | null | undefined | Workout_schemaCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? Workout_schemaCountOutputType
    : S extends undefined
    ? never
    : S extends Workout_schemaCountOutputTypeArgs
    ?'include' extends U
    ? Workout_schemaCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof Workout_schemaCountOutputType ? Workout_schemaCountOutputType[P] : never
  } 
    : Workout_schemaCountOutputType
  : Workout_schemaCountOutputType




  // Custom InputTypes

  /**
   * Workout_schemaCountOutputType without action
   */
  export type Workout_schemaCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the Workout_schemaCountOutputType
     * 
    **/
    select?: Workout_schemaCountOutputTypeSelect | null
  }



  /**
   * Count Type Superset_schemaCountOutputType
   */


  export type Superset_schemaCountOutputType = {
    superset_workout_schema: number
  }

  export type Superset_schemaCountOutputTypeSelect = {
    superset_workout_schema?: boolean
  }

  export type Superset_schemaCountOutputTypeGetPayload<
    S extends boolean | null | undefined | Superset_schemaCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? Superset_schemaCountOutputType
    : S extends undefined
    ? never
    : S extends Superset_schemaCountOutputTypeArgs
    ?'include' extends U
    ? Superset_schemaCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof Superset_schemaCountOutputType ? Superset_schemaCountOutputType[P] : never
  } 
    : Superset_schemaCountOutputType
  : Superset_schemaCountOutputType




  // Custom InputTypes

  /**
   * Superset_schemaCountOutputType without action
   */
  export type Superset_schemaCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the Superset_schemaCountOutputType
     * 
    **/
    select?: Superset_schemaCountOutputTypeSelect | null
  }



  /**
   * Count Type Superset_workout_schemaCountOutputType
   */


  export type Superset_workout_schemaCountOutputType = {
    superset_workout_instance: number
  }

  export type Superset_workout_schemaCountOutputTypeSelect = {
    superset_workout_instance?: boolean
  }

  export type Superset_workout_schemaCountOutputTypeGetPayload<
    S extends boolean | null | undefined | Superset_workout_schemaCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? Superset_workout_schemaCountOutputType
    : S extends undefined
    ? never
    : S extends Superset_workout_schemaCountOutputTypeArgs
    ?'include' extends U
    ? Superset_workout_schemaCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof Superset_workout_schemaCountOutputType ? Superset_workout_schemaCountOutputType[P] : never
  } 
    : Superset_workout_schemaCountOutputType
  : Superset_workout_schemaCountOutputType




  // Custom InputTypes

  /**
   * Superset_workout_schemaCountOutputType without action
   */
  export type Superset_workout_schemaCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the Superset_workout_schemaCountOutputType
     * 
    **/
    select?: Superset_workout_schemaCountOutputTypeSelect | null
  }



  /**
   * Count Type Session_instanceCountOutputType
   */


  export type Session_instanceCountOutputType = {
    workout_instance: number
    superset_workout_instance: number
  }

  export type Session_instanceCountOutputTypeSelect = {
    workout_instance?: boolean
    superset_workout_instance?: boolean
  }

  export type Session_instanceCountOutputTypeGetPayload<
    S extends boolean | null | undefined | Session_instanceCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? Session_instanceCountOutputType
    : S extends undefined
    ? never
    : S extends Session_instanceCountOutputTypeArgs
    ?'include' extends U
    ? Session_instanceCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof Session_instanceCountOutputType ? Session_instanceCountOutputType[P] : never
  } 
    : Session_instanceCountOutputType
  : Session_instanceCountOutputType




  // Custom InputTypes

  /**
   * Session_instanceCountOutputType without action
   */
  export type Session_instanceCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the Session_instanceCountOutputType
     * 
    **/
    select?: Session_instanceCountOutputTypeSelect | null
  }



  /**
   * Models
   */

  /**
   * Model user
   */


  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    first_name: string | null
    last_name: string | null
    email: string | null
    hashed_password: string | null
    is_banned: boolean | null
    created_time: Date | null
    last_token_generated_at: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    first_name: string | null
    last_name: string | null
    email: string | null
    hashed_password: string | null
    is_banned: boolean | null
    created_time: Date | null
    last_token_generated_at: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    first_name: number
    last_name: number
    email: number
    hashed_password: number
    is_banned: number
    created_time: number
    last_token_generated_at: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    first_name?: true
    last_name?: true
    email?: true
    hashed_password?: true
    is_banned?: true
    created_time?: true
    last_token_generated_at?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    first_name?: true
    last_name?: true
    email?: true
    hashed_password?: true
    is_banned?: true
    created_time?: true
    last_token_generated_at?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    first_name?: true
    last_name?: true
    email?: true
    hashed_password?: true
    is_banned?: true
    created_time?: true
    last_token_generated_at?: true
    _all?: true
  }

  export type UserAggregateArgs = {
    /**
     * Filter which user to aggregate.
     * 
    **/
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     * 
    **/
    orderBy?: Enumerable<userOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs = {
    where?: userWhereInput
    orderBy?: Enumerable<userOrderByWithAggregationInput>
    by: Array<UserScalarFieldEnum>
    having?: userScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }


  export type UserGroupByOutputType = {
    id: string
    first_name: string
    last_name: string
    email: string
    hashed_password: string
    is_banned: boolean
    created_time: Date
    last_token_generated_at: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = PrismaPromise<
    Array<
      PickArray<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type userSelect = {
    id?: boolean
    first_name?: boolean
    last_name?: boolean
    email?: boolean
    hashed_password?: boolean
    is_banned?: boolean
    created_time?: boolean
    last_token_generated_at?: boolean
    workout?: boolean | workoutFindManyArgs
    session_schema?: boolean | session_schemaFindManyArgs
    _count?: boolean | UserCountOutputTypeArgs
  }

  export type userInclude = {
    workout?: boolean | workoutFindManyArgs
    session_schema?: boolean | session_schemaFindManyArgs
    _count?: boolean | UserCountOutputTypeArgs
  }

  export type userGetPayload<
    S extends boolean | null | undefined | userArgs,
    U = keyof S
      > = S extends true
        ? user
    : S extends undefined
    ? never
    : S extends userArgs | userFindManyArgs
    ?'include' extends U
    ? user  & {
    [P in TrueKeys<S['include']>]:
        P extends 'workout' ? Array < workoutGetPayload<S['include'][P]>>  :
        P extends 'session_schema' ? Array < session_schemaGetPayload<S['include'][P]>>  :
        P extends '_count' ? UserCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'workout' ? Array < workoutGetPayload<S['select'][P]>>  :
        P extends 'session_schema' ? Array < session_schemaGetPayload<S['select'][P]>>  :
        P extends '_count' ? UserCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof user ? user[P] : never
  } 
    : user
  : user


  type userCountArgs = Merge<
    Omit<userFindManyArgs, 'select' | 'include'> & {
      select?: UserCountAggregateInputType | true
    }
  >

  export interface userDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one User that matches the filter.
     * @param {userFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends userFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, userFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'user'> extends True ? CheckSelect<T, Prisma__userClient<user>, Prisma__userClient<userGetPayload<T>>> : CheckSelect<T, Prisma__userClient<user | null >, Prisma__userClient<userGetPayload<T> | null >>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends userFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, userFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'user'> extends True ? CheckSelect<T, Prisma__userClient<user>, Prisma__userClient<userGetPayload<T>>> : CheckSelect<T, Prisma__userClient<user | null >, Prisma__userClient<userGetPayload<T> | null >>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends userFindManyArgs>(
      args?: SelectSubset<T, userFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<user>>, PrismaPromise<Array<userGetPayload<T>>>>

    /**
     * Create a User.
     * @param {userCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
    **/
    create<T extends userCreateArgs>(
      args: SelectSubset<T, userCreateArgs>
    ): CheckSelect<T, Prisma__userClient<user>, Prisma__userClient<userGetPayload<T>>>

    /**
     * Create many Users.
     *     @param {userCreateManyArgs} args - Arguments to create many Users.
     *     @example
     *     // Create many Users
     *     const user = await prisma.user.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends userCreateManyArgs>(
      args?: SelectSubset<T, userCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {userDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
    **/
    delete<T extends userDeleteArgs>(
      args: SelectSubset<T, userDeleteArgs>
    ): CheckSelect<T, Prisma__userClient<user>, Prisma__userClient<userGetPayload<T>>>

    /**
     * Update one User.
     * @param {userUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends userUpdateArgs>(
      args: SelectSubset<T, userUpdateArgs>
    ): CheckSelect<T, Prisma__userClient<user>, Prisma__userClient<userGetPayload<T>>>

    /**
     * Delete zero or more Users.
     * @param {userDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends userDeleteManyArgs>(
      args?: SelectSubset<T, userDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends userUpdateManyArgs>(
      args: SelectSubset<T, userUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {userUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
    **/
    upsert<T extends userUpsertArgs>(
      args: SelectSubset<T, userUpsertArgs>
    ): CheckSelect<T, Prisma__userClient<user>, Prisma__userClient<userGetPayload<T>>>

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends userCountArgs>(
      args?: Subset<T, userCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for user.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__userClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    workout<T extends workoutFindManyArgs = {}>(args?: Subset<T, workoutFindManyArgs>): CheckSelect<T, PrismaPromise<Array<workout>>, PrismaPromise<Array<workoutGetPayload<T>>>>;

    session_schema<T extends session_schemaFindManyArgs = {}>(args?: Subset<T, session_schemaFindManyArgs>): CheckSelect<T, PrismaPromise<Array<session_schema>>, PrismaPromise<Array<session_schemaGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * user findUnique
   */
  export type userFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the user
     * 
    **/
    select?: userSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: userInclude | null
    /**
     * Throw an Error if a user can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which user to fetch.
     * 
    **/
    where: userWhereUniqueInput
  }


  /**
   * user findFirst
   */
  export type userFindFirstArgs = {
    /**
     * Select specific fields to fetch from the user
     * 
    **/
    select?: userSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: userInclude | null
    /**
     * Throw an Error if a user can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which user to fetch.
     * 
    **/
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     * 
    **/
    orderBy?: Enumerable<userOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     * 
    **/
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     * 
    **/
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * user findMany
   */
  export type userFindManyArgs = {
    /**
     * Select specific fields to fetch from the user
     * 
    **/
    select?: userSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: userInclude | null
    /**
     * Filter, which users to fetch.
     * 
    **/
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     * 
    **/
    orderBy?: Enumerable<userOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     * 
    **/
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     * 
    **/
    skip?: number
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * user create
   */
  export type userCreateArgs = {
    /**
     * Select specific fields to fetch from the user
     * 
    **/
    select?: userSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: userInclude | null
    /**
     * The data needed to create a user.
     * 
    **/
    data: XOR<userCreateInput, userUncheckedCreateInput>
  }


  /**
   * user createMany
   */
  export type userCreateManyArgs = {
    /**
     * The data used to create many users.
     * 
    **/
    data: Enumerable<userCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * user update
   */
  export type userUpdateArgs = {
    /**
     * Select specific fields to fetch from the user
     * 
    **/
    select?: userSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: userInclude | null
    /**
     * The data needed to update a user.
     * 
    **/
    data: XOR<userUpdateInput, userUncheckedUpdateInput>
    /**
     * Choose, which user to update.
     * 
    **/
    where: userWhereUniqueInput
  }


  /**
   * user updateMany
   */
  export type userUpdateManyArgs = {
    /**
     * The data used to update users.
     * 
    **/
    data: XOR<userUpdateManyMutationInput, userUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     * 
    **/
    where?: userWhereInput
  }


  /**
   * user upsert
   */
  export type userUpsertArgs = {
    /**
     * Select specific fields to fetch from the user
     * 
    **/
    select?: userSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: userInclude | null
    /**
     * The filter to search for the user to update in case it exists.
     * 
    **/
    where: userWhereUniqueInput
    /**
     * In case the user found by the `where` argument doesn't exist, create a new user with this data.
     * 
    **/
    create: XOR<userCreateInput, userUncheckedCreateInput>
    /**
     * In case the user was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<userUpdateInput, userUncheckedUpdateInput>
  }


  /**
   * user delete
   */
  export type userDeleteArgs = {
    /**
     * Select specific fields to fetch from the user
     * 
    **/
    select?: userSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: userInclude | null
    /**
     * Filter which user to delete.
     * 
    **/
    where: userWhereUniqueInput
  }


  /**
   * user deleteMany
   */
  export type userDeleteManyArgs = {
    /**
     * Filter which users to delete
     * 
    **/
    where?: userWhereInput
  }


  /**
   * user without action
   */
  export type userArgs = {
    /**
     * Select specific fields to fetch from the user
     * 
    **/
    select?: userSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: userInclude | null
  }



  /**
   * Model workout
   */


  export type AggregateWorkout = {
    _count: WorkoutCountAggregateOutputType | null
    _min: WorkoutMinAggregateOutputType | null
    _max: WorkoutMaxAggregateOutputType | null
  }

  export type WorkoutMinAggregateOutputType = {
    id: string | null
    name: string | null
    category: workout_type | null
    target_body_part: body_part | null
    intensity: intensity_levels | null
    owner_id: string | null
    is_public: boolean | null
  }

  export type WorkoutMaxAggregateOutputType = {
    id: string | null
    name: string | null
    category: workout_type | null
    target_body_part: body_part | null
    intensity: intensity_levels | null
    owner_id: string | null
    is_public: boolean | null
  }

  export type WorkoutCountAggregateOutputType = {
    id: number
    name: number
    category: number
    target_body_part: number
    intensity: number
    owner_id: number
    is_public: number
    _all: number
  }


  export type WorkoutMinAggregateInputType = {
    id?: true
    name?: true
    category?: true
    target_body_part?: true
    intensity?: true
    owner_id?: true
    is_public?: true
  }

  export type WorkoutMaxAggregateInputType = {
    id?: true
    name?: true
    category?: true
    target_body_part?: true
    intensity?: true
    owner_id?: true
    is_public?: true
  }

  export type WorkoutCountAggregateInputType = {
    id?: true
    name?: true
    category?: true
    target_body_part?: true
    intensity?: true
    owner_id?: true
    is_public?: true
    _all?: true
  }

  export type WorkoutAggregateArgs = {
    /**
     * Filter which workout to aggregate.
     * 
    **/
    where?: workoutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of workouts to fetch.
     * 
    **/
    orderBy?: Enumerable<workoutOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: workoutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` workouts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` workouts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned workouts
    **/
    _count?: true | WorkoutCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorkoutMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorkoutMaxAggregateInputType
  }

  export type GetWorkoutAggregateType<T extends WorkoutAggregateArgs> = {
        [P in keyof T & keyof AggregateWorkout]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkout[P]>
      : GetScalarType<T[P], AggregateWorkout[P]>
  }




  export type WorkoutGroupByArgs = {
    where?: workoutWhereInput
    orderBy?: Enumerable<workoutOrderByWithAggregationInput>
    by: Array<WorkoutScalarFieldEnum>
    having?: workoutScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorkoutCountAggregateInputType | true
    _min?: WorkoutMinAggregateInputType
    _max?: WorkoutMaxAggregateInputType
  }


  export type WorkoutGroupByOutputType = {
    id: string
    name: string
    category: workout_type
    target_body_part: body_part | null
    intensity: intensity_levels | null
    owner_id: string
    is_public: boolean
    _count: WorkoutCountAggregateOutputType | null
    _min: WorkoutMinAggregateOutputType | null
    _max: WorkoutMaxAggregateOutputType | null
  }

  type GetWorkoutGroupByPayload<T extends WorkoutGroupByArgs> = PrismaPromise<
    Array<
      PickArray<WorkoutGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorkoutGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorkoutGroupByOutputType[P]>
            : GetScalarType<T[P], WorkoutGroupByOutputType[P]>
        }
      >
    >


  export type workoutSelect = {
    id?: boolean
    name?: boolean
    category?: boolean
    target_body_part?: boolean
    intensity?: boolean
    owner_id?: boolean
    owner?: boolean | userArgs
    is_public?: boolean
    workout_schema?: boolean | workout_schemaFindManyArgs
    superset_workout_schema?: boolean | superset_workout_schemaFindManyArgs
    _count?: boolean | WorkoutCountOutputTypeArgs
  }

  export type workoutInclude = {
    owner?: boolean | userArgs
    workout_schema?: boolean | workout_schemaFindManyArgs
    superset_workout_schema?: boolean | superset_workout_schemaFindManyArgs
    _count?: boolean | WorkoutCountOutputTypeArgs
  }

  export type workoutGetPayload<
    S extends boolean | null | undefined | workoutArgs,
    U = keyof S
      > = S extends true
        ? workout
    : S extends undefined
    ? never
    : S extends workoutArgs | workoutFindManyArgs
    ?'include' extends U
    ? workout  & {
    [P in TrueKeys<S['include']>]:
        P extends 'owner' ? userGetPayload<S['include'][P]> :
        P extends 'workout_schema' ? Array < workout_schemaGetPayload<S['include'][P]>>  :
        P extends 'superset_workout_schema' ? Array < superset_workout_schemaGetPayload<S['include'][P]>>  :
        P extends '_count' ? WorkoutCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'owner' ? userGetPayload<S['select'][P]> :
        P extends 'workout_schema' ? Array < workout_schemaGetPayload<S['select'][P]>>  :
        P extends 'superset_workout_schema' ? Array < superset_workout_schemaGetPayload<S['select'][P]>>  :
        P extends '_count' ? WorkoutCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof workout ? workout[P] : never
  } 
    : workout
  : workout


  type workoutCountArgs = Merge<
    Omit<workoutFindManyArgs, 'select' | 'include'> & {
      select?: WorkoutCountAggregateInputType | true
    }
  >

  export interface workoutDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Workout that matches the filter.
     * @param {workoutFindUniqueArgs} args - Arguments to find a Workout
     * @example
     * // Get one Workout
     * const workout = await prisma.workout.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends workoutFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, workoutFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'workout'> extends True ? CheckSelect<T, Prisma__workoutClient<workout>, Prisma__workoutClient<workoutGetPayload<T>>> : CheckSelect<T, Prisma__workoutClient<workout | null >, Prisma__workoutClient<workoutGetPayload<T> | null >>

    /**
     * Find the first Workout that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {workoutFindFirstArgs} args - Arguments to find a Workout
     * @example
     * // Get one Workout
     * const workout = await prisma.workout.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends workoutFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, workoutFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'workout'> extends True ? CheckSelect<T, Prisma__workoutClient<workout>, Prisma__workoutClient<workoutGetPayload<T>>> : CheckSelect<T, Prisma__workoutClient<workout | null >, Prisma__workoutClient<workoutGetPayload<T> | null >>

    /**
     * Find zero or more Workouts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {workoutFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Workouts
     * const workouts = await prisma.workout.findMany()
     * 
     * // Get first 10 Workouts
     * const workouts = await prisma.workout.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const workoutWithIdOnly = await prisma.workout.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends workoutFindManyArgs>(
      args?: SelectSubset<T, workoutFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<workout>>, PrismaPromise<Array<workoutGetPayload<T>>>>

    /**
     * Create a Workout.
     * @param {workoutCreateArgs} args - Arguments to create a Workout.
     * @example
     * // Create one Workout
     * const Workout = await prisma.workout.create({
     *   data: {
     *     // ... data to create a Workout
     *   }
     * })
     * 
    **/
    create<T extends workoutCreateArgs>(
      args: SelectSubset<T, workoutCreateArgs>
    ): CheckSelect<T, Prisma__workoutClient<workout>, Prisma__workoutClient<workoutGetPayload<T>>>

    /**
     * Create many Workouts.
     *     @param {workoutCreateManyArgs} args - Arguments to create many Workouts.
     *     @example
     *     // Create many Workouts
     *     const workout = await prisma.workout.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends workoutCreateManyArgs>(
      args?: SelectSubset<T, workoutCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Workout.
     * @param {workoutDeleteArgs} args - Arguments to delete one Workout.
     * @example
     * // Delete one Workout
     * const Workout = await prisma.workout.delete({
     *   where: {
     *     // ... filter to delete one Workout
     *   }
     * })
     * 
    **/
    delete<T extends workoutDeleteArgs>(
      args: SelectSubset<T, workoutDeleteArgs>
    ): CheckSelect<T, Prisma__workoutClient<workout>, Prisma__workoutClient<workoutGetPayload<T>>>

    /**
     * Update one Workout.
     * @param {workoutUpdateArgs} args - Arguments to update one Workout.
     * @example
     * // Update one Workout
     * const workout = await prisma.workout.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends workoutUpdateArgs>(
      args: SelectSubset<T, workoutUpdateArgs>
    ): CheckSelect<T, Prisma__workoutClient<workout>, Prisma__workoutClient<workoutGetPayload<T>>>

    /**
     * Delete zero or more Workouts.
     * @param {workoutDeleteManyArgs} args - Arguments to filter Workouts to delete.
     * @example
     * // Delete a few Workouts
     * const { count } = await prisma.workout.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends workoutDeleteManyArgs>(
      args?: SelectSubset<T, workoutDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Workouts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {workoutUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Workouts
     * const workout = await prisma.workout.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends workoutUpdateManyArgs>(
      args: SelectSubset<T, workoutUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Workout.
     * @param {workoutUpsertArgs} args - Arguments to update or create a Workout.
     * @example
     * // Update or create a Workout
     * const workout = await prisma.workout.upsert({
     *   create: {
     *     // ... data to create a Workout
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Workout we want to update
     *   }
     * })
    **/
    upsert<T extends workoutUpsertArgs>(
      args: SelectSubset<T, workoutUpsertArgs>
    ): CheckSelect<T, Prisma__workoutClient<workout>, Prisma__workoutClient<workoutGetPayload<T>>>

    /**
     * Count the number of Workouts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {workoutCountArgs} args - Arguments to filter Workouts to count.
     * @example
     * // Count the number of Workouts
     * const count = await prisma.workout.count({
     *   where: {
     *     // ... the filter for the Workouts we want to count
     *   }
     * })
    **/
    count<T extends workoutCountArgs>(
      args?: Subset<T, workoutCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkoutCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Workout.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WorkoutAggregateArgs>(args: Subset<T, WorkoutAggregateArgs>): PrismaPromise<GetWorkoutAggregateType<T>>

    /**
     * Group by Workout.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkoutGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WorkoutGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkoutGroupByArgs['orderBy'] }
        : { orderBy?: WorkoutGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WorkoutGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkoutGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for workout.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__workoutClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    owner<T extends userArgs = {}>(args?: Subset<T, userArgs>): CheckSelect<T, Prisma__userClient<user | null >, Prisma__userClient<userGetPayload<T> | null >>;

    workout_schema<T extends workout_schemaFindManyArgs = {}>(args?: Subset<T, workout_schemaFindManyArgs>): CheckSelect<T, PrismaPromise<Array<workout_schema>>, PrismaPromise<Array<workout_schemaGetPayload<T>>>>;

    superset_workout_schema<T extends superset_workout_schemaFindManyArgs = {}>(args?: Subset<T, superset_workout_schemaFindManyArgs>): CheckSelect<T, PrismaPromise<Array<superset_workout_schema>>, PrismaPromise<Array<superset_workout_schemaGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * workout findUnique
   */
  export type workoutFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the workout
     * 
    **/
    select?: workoutSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: workoutInclude | null
    /**
     * Throw an Error if a workout can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which workout to fetch.
     * 
    **/
    where: workoutWhereUniqueInput
  }


  /**
   * workout findFirst
   */
  export type workoutFindFirstArgs = {
    /**
     * Select specific fields to fetch from the workout
     * 
    **/
    select?: workoutSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: workoutInclude | null
    /**
     * Throw an Error if a workout can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which workout to fetch.
     * 
    **/
    where?: workoutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of workouts to fetch.
     * 
    **/
    orderBy?: Enumerable<workoutOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for workouts.
     * 
    **/
    cursor?: workoutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` workouts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` workouts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of workouts.
     * 
    **/
    distinct?: Enumerable<WorkoutScalarFieldEnum>
  }


  /**
   * workout findMany
   */
  export type workoutFindManyArgs = {
    /**
     * Select specific fields to fetch from the workout
     * 
    **/
    select?: workoutSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: workoutInclude | null
    /**
     * Filter, which workouts to fetch.
     * 
    **/
    where?: workoutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of workouts to fetch.
     * 
    **/
    orderBy?: Enumerable<workoutOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing workouts.
     * 
    **/
    cursor?: workoutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` workouts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` workouts.
     * 
    **/
    skip?: number
    distinct?: Enumerable<WorkoutScalarFieldEnum>
  }


  /**
   * workout create
   */
  export type workoutCreateArgs = {
    /**
     * Select specific fields to fetch from the workout
     * 
    **/
    select?: workoutSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: workoutInclude | null
    /**
     * The data needed to create a workout.
     * 
    **/
    data: XOR<workoutCreateInput, workoutUncheckedCreateInput>
  }


  /**
   * workout createMany
   */
  export type workoutCreateManyArgs = {
    /**
     * The data used to create many workouts.
     * 
    **/
    data: Enumerable<workoutCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * workout update
   */
  export type workoutUpdateArgs = {
    /**
     * Select specific fields to fetch from the workout
     * 
    **/
    select?: workoutSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: workoutInclude | null
    /**
     * The data needed to update a workout.
     * 
    **/
    data: XOR<workoutUpdateInput, workoutUncheckedUpdateInput>
    /**
     * Choose, which workout to update.
     * 
    **/
    where: workoutWhereUniqueInput
  }


  /**
   * workout updateMany
   */
  export type workoutUpdateManyArgs = {
    /**
     * The data used to update workouts.
     * 
    **/
    data: XOR<workoutUpdateManyMutationInput, workoutUncheckedUpdateManyInput>
    /**
     * Filter which workouts to update
     * 
    **/
    where?: workoutWhereInput
  }


  /**
   * workout upsert
   */
  export type workoutUpsertArgs = {
    /**
     * Select specific fields to fetch from the workout
     * 
    **/
    select?: workoutSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: workoutInclude | null
    /**
     * The filter to search for the workout to update in case it exists.
     * 
    **/
    where: workoutWhereUniqueInput
    /**
     * In case the workout found by the `where` argument doesn't exist, create a new workout with this data.
     * 
    **/
    create: XOR<workoutCreateInput, workoutUncheckedCreateInput>
    /**
     * In case the workout was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<workoutUpdateInput, workoutUncheckedUpdateInput>
  }


  /**
   * workout delete
   */
  export type workoutDeleteArgs = {
    /**
     * Select specific fields to fetch from the workout
     * 
    **/
    select?: workoutSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: workoutInclude | null
    /**
     * Filter which workout to delete.
     * 
    **/
    where: workoutWhereUniqueInput
  }


  /**
   * workout deleteMany
   */
  export type workoutDeleteManyArgs = {
    /**
     * Filter which workouts to delete
     * 
    **/
    where?: workoutWhereInput
  }


  /**
   * workout without action
   */
  export type workoutArgs = {
    /**
     * Select specific fields to fetch from the workout
     * 
    **/
    select?: workoutSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: workoutInclude | null
  }



  /**
   * Model session_schema
   */


  export type AggregateSession_schema = {
    _count: Session_schemaCountAggregateOutputType | null
    _min: Session_schemaMinAggregateOutputType | null
    _max: Session_schemaMaxAggregateOutputType | null
  }

  export type Session_schemaMinAggregateOutputType = {
    id: string | null
    name: string | null
    owner_id: string | null
  }

  export type Session_schemaMaxAggregateOutputType = {
    id: string | null
    name: string | null
    owner_id: string | null
  }

  export type Session_schemaCountAggregateOutputType = {
    id: number
    name: number
    owner_id: number
    _all: number
  }


  export type Session_schemaMinAggregateInputType = {
    id?: true
    name?: true
    owner_id?: true
  }

  export type Session_schemaMaxAggregateInputType = {
    id?: true
    name?: true
    owner_id?: true
  }

  export type Session_schemaCountAggregateInputType = {
    id?: true
    name?: true
    owner_id?: true
    _all?: true
  }

  export type Session_schemaAggregateArgs = {
    /**
     * Filter which session_schema to aggregate.
     * 
    **/
    where?: session_schemaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of session_schemas to fetch.
     * 
    **/
    orderBy?: Enumerable<session_schemaOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: session_schemaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` session_schemas from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` session_schemas.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned session_schemas
    **/
    _count?: true | Session_schemaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Session_schemaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Session_schemaMaxAggregateInputType
  }

  export type GetSession_schemaAggregateType<T extends Session_schemaAggregateArgs> = {
        [P in keyof T & keyof AggregateSession_schema]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession_schema[P]>
      : GetScalarType<T[P], AggregateSession_schema[P]>
  }




  export type Session_schemaGroupByArgs = {
    where?: session_schemaWhereInput
    orderBy?: Enumerable<session_schemaOrderByWithAggregationInput>
    by: Array<Session_schemaScalarFieldEnum>
    having?: session_schemaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Session_schemaCountAggregateInputType | true
    _min?: Session_schemaMinAggregateInputType
    _max?: Session_schemaMaxAggregateInputType
  }


  export type Session_schemaGroupByOutputType = {
    id: string
    name: string
    owner_id: string
    _count: Session_schemaCountAggregateOutputType | null
    _min: Session_schemaMinAggregateOutputType | null
    _max: Session_schemaMaxAggregateOutputType | null
  }

  type GetSession_schemaGroupByPayload<T extends Session_schemaGroupByArgs> = PrismaPromise<
    Array<
      PickArray<Session_schemaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Session_schemaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Session_schemaGroupByOutputType[P]>
            : GetScalarType<T[P], Session_schemaGroupByOutputType[P]>
        }
      >
    >


  export type session_schemaSelect = {
    id?: boolean
    name?: boolean
    owner_id?: boolean
    owner?: boolean | userArgs
    workout_schema?: boolean | workout_schemaFindManyArgs
    superset_schema?: boolean | superset_schemaFindManyArgs
    session_instance?: boolean | session_instanceFindManyArgs
    _count?: boolean | Session_schemaCountOutputTypeArgs
  }

  export type session_schemaInclude = {
    owner?: boolean | userArgs
    workout_schema?: boolean | workout_schemaFindManyArgs
    superset_schema?: boolean | superset_schemaFindManyArgs
    session_instance?: boolean | session_instanceFindManyArgs
    _count?: boolean | Session_schemaCountOutputTypeArgs
  }

  export type session_schemaGetPayload<
    S extends boolean | null | undefined | session_schemaArgs,
    U = keyof S
      > = S extends true
        ? session_schema
    : S extends undefined
    ? never
    : S extends session_schemaArgs | session_schemaFindManyArgs
    ?'include' extends U
    ? session_schema  & {
    [P in TrueKeys<S['include']>]:
        P extends 'owner' ? userGetPayload<S['include'][P]> :
        P extends 'workout_schema' ? Array < workout_schemaGetPayload<S['include'][P]>>  :
        P extends 'superset_schema' ? Array < superset_schemaGetPayload<S['include'][P]>>  :
        P extends 'session_instance' ? Array < session_instanceGetPayload<S['include'][P]>>  :
        P extends '_count' ? Session_schemaCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'owner' ? userGetPayload<S['select'][P]> :
        P extends 'workout_schema' ? Array < workout_schemaGetPayload<S['select'][P]>>  :
        P extends 'superset_schema' ? Array < superset_schemaGetPayload<S['select'][P]>>  :
        P extends 'session_instance' ? Array < session_instanceGetPayload<S['select'][P]>>  :
        P extends '_count' ? Session_schemaCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof session_schema ? session_schema[P] : never
  } 
    : session_schema
  : session_schema


  type session_schemaCountArgs = Merge<
    Omit<session_schemaFindManyArgs, 'select' | 'include'> & {
      select?: Session_schemaCountAggregateInputType | true
    }
  >

  export interface session_schemaDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Session_schema that matches the filter.
     * @param {session_schemaFindUniqueArgs} args - Arguments to find a Session_schema
     * @example
     * // Get one Session_schema
     * const session_schema = await prisma.session_schema.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends session_schemaFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, session_schemaFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'session_schema'> extends True ? CheckSelect<T, Prisma__session_schemaClient<session_schema>, Prisma__session_schemaClient<session_schemaGetPayload<T>>> : CheckSelect<T, Prisma__session_schemaClient<session_schema | null >, Prisma__session_schemaClient<session_schemaGetPayload<T> | null >>

    /**
     * Find the first Session_schema that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {session_schemaFindFirstArgs} args - Arguments to find a Session_schema
     * @example
     * // Get one Session_schema
     * const session_schema = await prisma.session_schema.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends session_schemaFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, session_schemaFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'session_schema'> extends True ? CheckSelect<T, Prisma__session_schemaClient<session_schema>, Prisma__session_schemaClient<session_schemaGetPayload<T>>> : CheckSelect<T, Prisma__session_schemaClient<session_schema | null >, Prisma__session_schemaClient<session_schemaGetPayload<T> | null >>

    /**
     * Find zero or more Session_schemas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {session_schemaFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Session_schemas
     * const session_schemas = await prisma.session_schema.findMany()
     * 
     * // Get first 10 Session_schemas
     * const session_schemas = await prisma.session_schema.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const session_schemaWithIdOnly = await prisma.session_schema.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends session_schemaFindManyArgs>(
      args?: SelectSubset<T, session_schemaFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<session_schema>>, PrismaPromise<Array<session_schemaGetPayload<T>>>>

    /**
     * Create a Session_schema.
     * @param {session_schemaCreateArgs} args - Arguments to create a Session_schema.
     * @example
     * // Create one Session_schema
     * const Session_schema = await prisma.session_schema.create({
     *   data: {
     *     // ... data to create a Session_schema
     *   }
     * })
     * 
    **/
    create<T extends session_schemaCreateArgs>(
      args: SelectSubset<T, session_schemaCreateArgs>
    ): CheckSelect<T, Prisma__session_schemaClient<session_schema>, Prisma__session_schemaClient<session_schemaGetPayload<T>>>

    /**
     * Create many Session_schemas.
     *     @param {session_schemaCreateManyArgs} args - Arguments to create many Session_schemas.
     *     @example
     *     // Create many Session_schemas
     *     const session_schema = await prisma.session_schema.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends session_schemaCreateManyArgs>(
      args?: SelectSubset<T, session_schemaCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Session_schema.
     * @param {session_schemaDeleteArgs} args - Arguments to delete one Session_schema.
     * @example
     * // Delete one Session_schema
     * const Session_schema = await prisma.session_schema.delete({
     *   where: {
     *     // ... filter to delete one Session_schema
     *   }
     * })
     * 
    **/
    delete<T extends session_schemaDeleteArgs>(
      args: SelectSubset<T, session_schemaDeleteArgs>
    ): CheckSelect<T, Prisma__session_schemaClient<session_schema>, Prisma__session_schemaClient<session_schemaGetPayload<T>>>

    /**
     * Update one Session_schema.
     * @param {session_schemaUpdateArgs} args - Arguments to update one Session_schema.
     * @example
     * // Update one Session_schema
     * const session_schema = await prisma.session_schema.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends session_schemaUpdateArgs>(
      args: SelectSubset<T, session_schemaUpdateArgs>
    ): CheckSelect<T, Prisma__session_schemaClient<session_schema>, Prisma__session_schemaClient<session_schemaGetPayload<T>>>

    /**
     * Delete zero or more Session_schemas.
     * @param {session_schemaDeleteManyArgs} args - Arguments to filter Session_schemas to delete.
     * @example
     * // Delete a few Session_schemas
     * const { count } = await prisma.session_schema.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends session_schemaDeleteManyArgs>(
      args?: SelectSubset<T, session_schemaDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Session_schemas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {session_schemaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Session_schemas
     * const session_schema = await prisma.session_schema.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends session_schemaUpdateManyArgs>(
      args: SelectSubset<T, session_schemaUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Session_schema.
     * @param {session_schemaUpsertArgs} args - Arguments to update or create a Session_schema.
     * @example
     * // Update or create a Session_schema
     * const session_schema = await prisma.session_schema.upsert({
     *   create: {
     *     // ... data to create a Session_schema
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session_schema we want to update
     *   }
     * })
    **/
    upsert<T extends session_schemaUpsertArgs>(
      args: SelectSubset<T, session_schemaUpsertArgs>
    ): CheckSelect<T, Prisma__session_schemaClient<session_schema>, Prisma__session_schemaClient<session_schemaGetPayload<T>>>

    /**
     * Count the number of Session_schemas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {session_schemaCountArgs} args - Arguments to filter Session_schemas to count.
     * @example
     * // Count the number of Session_schemas
     * const count = await prisma.session_schema.count({
     *   where: {
     *     // ... the filter for the Session_schemas we want to count
     *   }
     * })
    **/
    count<T extends session_schemaCountArgs>(
      args?: Subset<T, session_schemaCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Session_schemaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session_schema.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Session_schemaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Session_schemaAggregateArgs>(args: Subset<T, Session_schemaAggregateArgs>): PrismaPromise<GetSession_schemaAggregateType<T>>

    /**
     * Group by Session_schema.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Session_schemaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends Session_schemaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Session_schemaGroupByArgs['orderBy'] }
        : { orderBy?: Session_schemaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, Session_schemaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSession_schemaGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for session_schema.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__session_schemaClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    owner<T extends userArgs = {}>(args?: Subset<T, userArgs>): CheckSelect<T, Prisma__userClient<user | null >, Prisma__userClient<userGetPayload<T> | null >>;

    workout_schema<T extends workout_schemaFindManyArgs = {}>(args?: Subset<T, workout_schemaFindManyArgs>): CheckSelect<T, PrismaPromise<Array<workout_schema>>, PrismaPromise<Array<workout_schemaGetPayload<T>>>>;

    superset_schema<T extends superset_schemaFindManyArgs = {}>(args?: Subset<T, superset_schemaFindManyArgs>): CheckSelect<T, PrismaPromise<Array<superset_schema>>, PrismaPromise<Array<superset_schemaGetPayload<T>>>>;

    session_instance<T extends session_instanceFindManyArgs = {}>(args?: Subset<T, session_instanceFindManyArgs>): CheckSelect<T, PrismaPromise<Array<session_instance>>, PrismaPromise<Array<session_instanceGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * session_schema findUnique
   */
  export type session_schemaFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the session_schema
     * 
    **/
    select?: session_schemaSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: session_schemaInclude | null
    /**
     * Throw an Error if a session_schema can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which session_schema to fetch.
     * 
    **/
    where: session_schemaWhereUniqueInput
  }


  /**
   * session_schema findFirst
   */
  export type session_schemaFindFirstArgs = {
    /**
     * Select specific fields to fetch from the session_schema
     * 
    **/
    select?: session_schemaSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: session_schemaInclude | null
    /**
     * Throw an Error if a session_schema can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which session_schema to fetch.
     * 
    **/
    where?: session_schemaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of session_schemas to fetch.
     * 
    **/
    orderBy?: Enumerable<session_schemaOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for session_schemas.
     * 
    **/
    cursor?: session_schemaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` session_schemas from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` session_schemas.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of session_schemas.
     * 
    **/
    distinct?: Enumerable<Session_schemaScalarFieldEnum>
  }


  /**
   * session_schema findMany
   */
  export type session_schemaFindManyArgs = {
    /**
     * Select specific fields to fetch from the session_schema
     * 
    **/
    select?: session_schemaSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: session_schemaInclude | null
    /**
     * Filter, which session_schemas to fetch.
     * 
    **/
    where?: session_schemaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of session_schemas to fetch.
     * 
    **/
    orderBy?: Enumerable<session_schemaOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing session_schemas.
     * 
    **/
    cursor?: session_schemaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` session_schemas from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` session_schemas.
     * 
    **/
    skip?: number
    distinct?: Enumerable<Session_schemaScalarFieldEnum>
  }


  /**
   * session_schema create
   */
  export type session_schemaCreateArgs = {
    /**
     * Select specific fields to fetch from the session_schema
     * 
    **/
    select?: session_schemaSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: session_schemaInclude | null
    /**
     * The data needed to create a session_schema.
     * 
    **/
    data: XOR<session_schemaCreateInput, session_schemaUncheckedCreateInput>
  }


  /**
   * session_schema createMany
   */
  export type session_schemaCreateManyArgs = {
    /**
     * The data used to create many session_schemas.
     * 
    **/
    data: Enumerable<session_schemaCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * session_schema update
   */
  export type session_schemaUpdateArgs = {
    /**
     * Select specific fields to fetch from the session_schema
     * 
    **/
    select?: session_schemaSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: session_schemaInclude | null
    /**
     * The data needed to update a session_schema.
     * 
    **/
    data: XOR<session_schemaUpdateInput, session_schemaUncheckedUpdateInput>
    /**
     * Choose, which session_schema to update.
     * 
    **/
    where: session_schemaWhereUniqueInput
  }


  /**
   * session_schema updateMany
   */
  export type session_schemaUpdateManyArgs = {
    /**
     * The data used to update session_schemas.
     * 
    **/
    data: XOR<session_schemaUpdateManyMutationInput, session_schemaUncheckedUpdateManyInput>
    /**
     * Filter which session_schemas to update
     * 
    **/
    where?: session_schemaWhereInput
  }


  /**
   * session_schema upsert
   */
  export type session_schemaUpsertArgs = {
    /**
     * Select specific fields to fetch from the session_schema
     * 
    **/
    select?: session_schemaSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: session_schemaInclude | null
    /**
     * The filter to search for the session_schema to update in case it exists.
     * 
    **/
    where: session_schemaWhereUniqueInput
    /**
     * In case the session_schema found by the `where` argument doesn't exist, create a new session_schema with this data.
     * 
    **/
    create: XOR<session_schemaCreateInput, session_schemaUncheckedCreateInput>
    /**
     * In case the session_schema was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<session_schemaUpdateInput, session_schemaUncheckedUpdateInput>
  }


  /**
   * session_schema delete
   */
  export type session_schemaDeleteArgs = {
    /**
     * Select specific fields to fetch from the session_schema
     * 
    **/
    select?: session_schemaSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: session_schemaInclude | null
    /**
     * Filter which session_schema to delete.
     * 
    **/
    where: session_schemaWhereUniqueInput
  }


  /**
   * session_schema deleteMany
   */
  export type session_schemaDeleteManyArgs = {
    /**
     * Filter which session_schemas to delete
     * 
    **/
    where?: session_schemaWhereInput
  }


  /**
   * session_schema without action
   */
  export type session_schemaArgs = {
    /**
     * Select specific fields to fetch from the session_schema
     * 
    **/
    select?: session_schemaSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: session_schemaInclude | null
  }



  /**
   * Model workout_schema
   */


  export type AggregateWorkout_schema = {
    _count: Workout_schemaCountAggregateOutputType | null
    _avg: Workout_schemaAvgAggregateOutputType | null
    _sum: Workout_schemaSumAggregateOutputType | null
    _min: Workout_schemaMinAggregateOutputType | null
    _max: Workout_schemaMaxAggregateOutputType | null
  }

  export type Workout_schemaAvgAggregateOutputType = {
    order: number | null
  }

  export type Workout_schemaSumAggregateOutputType = {
    order: number | null
  }

  export type Workout_schemaMinAggregateOutputType = {
    id: string | null
    session_schema_id: string | null
    workout_id: string | null
    order: number | null
  }

  export type Workout_schemaMaxAggregateOutputType = {
    id: string | null
    session_schema_id: string | null
    workout_id: string | null
    order: number | null
  }

  export type Workout_schemaCountAggregateOutputType = {
    id: number
    session_schema_id: number
    workout_id: number
    default_target: number
    order: number
    _all: number
  }


  export type Workout_schemaAvgAggregateInputType = {
    order?: true
  }

  export type Workout_schemaSumAggregateInputType = {
    order?: true
  }

  export type Workout_schemaMinAggregateInputType = {
    id?: true
    session_schema_id?: true
    workout_id?: true
    order?: true
  }

  export type Workout_schemaMaxAggregateInputType = {
    id?: true
    session_schema_id?: true
    workout_id?: true
    order?: true
  }

  export type Workout_schemaCountAggregateInputType = {
    id?: true
    session_schema_id?: true
    workout_id?: true
    default_target?: true
    order?: true
    _all?: true
  }

  export type Workout_schemaAggregateArgs = {
    /**
     * Filter which workout_schema to aggregate.
     * 
    **/
    where?: workout_schemaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of workout_schemas to fetch.
     * 
    **/
    orderBy?: Enumerable<workout_schemaOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: workout_schemaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` workout_schemas from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` workout_schemas.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned workout_schemas
    **/
    _count?: true | Workout_schemaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Workout_schemaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Workout_schemaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Workout_schemaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Workout_schemaMaxAggregateInputType
  }

  export type GetWorkout_schemaAggregateType<T extends Workout_schemaAggregateArgs> = {
        [P in keyof T & keyof AggregateWorkout_schema]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkout_schema[P]>
      : GetScalarType<T[P], AggregateWorkout_schema[P]>
  }




  export type Workout_schemaGroupByArgs = {
    where?: workout_schemaWhereInput
    orderBy?: Enumerable<workout_schemaOrderByWithAggregationInput>
    by: Array<Workout_schemaScalarFieldEnum>
    having?: workout_schemaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Workout_schemaCountAggregateInputType | true
    _avg?: Workout_schemaAvgAggregateInputType
    _sum?: Workout_schemaSumAggregateInputType
    _min?: Workout_schemaMinAggregateInputType
    _max?: Workout_schemaMaxAggregateInputType
  }


  export type Workout_schemaGroupByOutputType = {
    id: string
    session_schema_id: string
    workout_id: string
    default_target: JsonValue
    order: number
    _count: Workout_schemaCountAggregateOutputType | null
    _avg: Workout_schemaAvgAggregateOutputType | null
    _sum: Workout_schemaSumAggregateOutputType | null
    _min: Workout_schemaMinAggregateOutputType | null
    _max: Workout_schemaMaxAggregateOutputType | null
  }

  type GetWorkout_schemaGroupByPayload<T extends Workout_schemaGroupByArgs> = PrismaPromise<
    Array<
      PickArray<Workout_schemaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Workout_schemaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Workout_schemaGroupByOutputType[P]>
            : GetScalarType<T[P], Workout_schemaGroupByOutputType[P]>
        }
      >
    >


  export type workout_schemaSelect = {
    id?: boolean
    session_schema_id?: boolean
    session_schema?: boolean | session_schemaArgs
    workout_id?: boolean
    workout?: boolean | workoutArgs
    default_target?: boolean
    order?: boolean
    workout_instance?: boolean | workout_instanceFindManyArgs
    _count?: boolean | Workout_schemaCountOutputTypeArgs
  }

  export type workout_schemaInclude = {
    session_schema?: boolean | session_schemaArgs
    workout?: boolean | workoutArgs
    workout_instance?: boolean | workout_instanceFindManyArgs
    _count?: boolean | Workout_schemaCountOutputTypeArgs
  }

  export type workout_schemaGetPayload<
    S extends boolean | null | undefined | workout_schemaArgs,
    U = keyof S
      > = S extends true
        ? workout_schema
    : S extends undefined
    ? never
    : S extends workout_schemaArgs | workout_schemaFindManyArgs
    ?'include' extends U
    ? workout_schema  & {
    [P in TrueKeys<S['include']>]:
        P extends 'session_schema' ? session_schemaGetPayload<S['include'][P]> :
        P extends 'workout' ? workoutGetPayload<S['include'][P]> :
        P extends 'workout_instance' ? Array < workout_instanceGetPayload<S['include'][P]>>  :
        P extends '_count' ? Workout_schemaCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'session_schema' ? session_schemaGetPayload<S['select'][P]> :
        P extends 'workout' ? workoutGetPayload<S['select'][P]> :
        P extends 'workout_instance' ? Array < workout_instanceGetPayload<S['select'][P]>>  :
        P extends '_count' ? Workout_schemaCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof workout_schema ? workout_schema[P] : never
  } 
    : workout_schema
  : workout_schema


  type workout_schemaCountArgs = Merge<
    Omit<workout_schemaFindManyArgs, 'select' | 'include'> & {
      select?: Workout_schemaCountAggregateInputType | true
    }
  >

  export interface workout_schemaDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Workout_schema that matches the filter.
     * @param {workout_schemaFindUniqueArgs} args - Arguments to find a Workout_schema
     * @example
     * // Get one Workout_schema
     * const workout_schema = await prisma.workout_schema.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends workout_schemaFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, workout_schemaFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'workout_schema'> extends True ? CheckSelect<T, Prisma__workout_schemaClient<workout_schema>, Prisma__workout_schemaClient<workout_schemaGetPayload<T>>> : CheckSelect<T, Prisma__workout_schemaClient<workout_schema | null >, Prisma__workout_schemaClient<workout_schemaGetPayload<T> | null >>

    /**
     * Find the first Workout_schema that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {workout_schemaFindFirstArgs} args - Arguments to find a Workout_schema
     * @example
     * // Get one Workout_schema
     * const workout_schema = await prisma.workout_schema.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends workout_schemaFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, workout_schemaFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'workout_schema'> extends True ? CheckSelect<T, Prisma__workout_schemaClient<workout_schema>, Prisma__workout_schemaClient<workout_schemaGetPayload<T>>> : CheckSelect<T, Prisma__workout_schemaClient<workout_schema | null >, Prisma__workout_schemaClient<workout_schemaGetPayload<T> | null >>

    /**
     * Find zero or more Workout_schemas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {workout_schemaFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Workout_schemas
     * const workout_schemas = await prisma.workout_schema.findMany()
     * 
     * // Get first 10 Workout_schemas
     * const workout_schemas = await prisma.workout_schema.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const workout_schemaWithIdOnly = await prisma.workout_schema.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends workout_schemaFindManyArgs>(
      args?: SelectSubset<T, workout_schemaFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<workout_schema>>, PrismaPromise<Array<workout_schemaGetPayload<T>>>>

    /**
     * Create a Workout_schema.
     * @param {workout_schemaCreateArgs} args - Arguments to create a Workout_schema.
     * @example
     * // Create one Workout_schema
     * const Workout_schema = await prisma.workout_schema.create({
     *   data: {
     *     // ... data to create a Workout_schema
     *   }
     * })
     * 
    **/
    create<T extends workout_schemaCreateArgs>(
      args: SelectSubset<T, workout_schemaCreateArgs>
    ): CheckSelect<T, Prisma__workout_schemaClient<workout_schema>, Prisma__workout_schemaClient<workout_schemaGetPayload<T>>>

    /**
     * Create many Workout_schemas.
     *     @param {workout_schemaCreateManyArgs} args - Arguments to create many Workout_schemas.
     *     @example
     *     // Create many Workout_schemas
     *     const workout_schema = await prisma.workout_schema.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends workout_schemaCreateManyArgs>(
      args?: SelectSubset<T, workout_schemaCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Workout_schema.
     * @param {workout_schemaDeleteArgs} args - Arguments to delete one Workout_schema.
     * @example
     * // Delete one Workout_schema
     * const Workout_schema = await prisma.workout_schema.delete({
     *   where: {
     *     // ... filter to delete one Workout_schema
     *   }
     * })
     * 
    **/
    delete<T extends workout_schemaDeleteArgs>(
      args: SelectSubset<T, workout_schemaDeleteArgs>
    ): CheckSelect<T, Prisma__workout_schemaClient<workout_schema>, Prisma__workout_schemaClient<workout_schemaGetPayload<T>>>

    /**
     * Update one Workout_schema.
     * @param {workout_schemaUpdateArgs} args - Arguments to update one Workout_schema.
     * @example
     * // Update one Workout_schema
     * const workout_schema = await prisma.workout_schema.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends workout_schemaUpdateArgs>(
      args: SelectSubset<T, workout_schemaUpdateArgs>
    ): CheckSelect<T, Prisma__workout_schemaClient<workout_schema>, Prisma__workout_schemaClient<workout_schemaGetPayload<T>>>

    /**
     * Delete zero or more Workout_schemas.
     * @param {workout_schemaDeleteManyArgs} args - Arguments to filter Workout_schemas to delete.
     * @example
     * // Delete a few Workout_schemas
     * const { count } = await prisma.workout_schema.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends workout_schemaDeleteManyArgs>(
      args?: SelectSubset<T, workout_schemaDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Workout_schemas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {workout_schemaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Workout_schemas
     * const workout_schema = await prisma.workout_schema.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends workout_schemaUpdateManyArgs>(
      args: SelectSubset<T, workout_schemaUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Workout_schema.
     * @param {workout_schemaUpsertArgs} args - Arguments to update or create a Workout_schema.
     * @example
     * // Update or create a Workout_schema
     * const workout_schema = await prisma.workout_schema.upsert({
     *   create: {
     *     // ... data to create a Workout_schema
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Workout_schema we want to update
     *   }
     * })
    **/
    upsert<T extends workout_schemaUpsertArgs>(
      args: SelectSubset<T, workout_schemaUpsertArgs>
    ): CheckSelect<T, Prisma__workout_schemaClient<workout_schema>, Prisma__workout_schemaClient<workout_schemaGetPayload<T>>>

    /**
     * Count the number of Workout_schemas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {workout_schemaCountArgs} args - Arguments to filter Workout_schemas to count.
     * @example
     * // Count the number of Workout_schemas
     * const count = await prisma.workout_schema.count({
     *   where: {
     *     // ... the filter for the Workout_schemas we want to count
     *   }
     * })
    **/
    count<T extends workout_schemaCountArgs>(
      args?: Subset<T, workout_schemaCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Workout_schemaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Workout_schema.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Workout_schemaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Workout_schemaAggregateArgs>(args: Subset<T, Workout_schemaAggregateArgs>): PrismaPromise<GetWorkout_schemaAggregateType<T>>

    /**
     * Group by Workout_schema.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Workout_schemaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends Workout_schemaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Workout_schemaGroupByArgs['orderBy'] }
        : { orderBy?: Workout_schemaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, Workout_schemaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkout_schemaGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for workout_schema.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__workout_schemaClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    session_schema<T extends session_schemaArgs = {}>(args?: Subset<T, session_schemaArgs>): CheckSelect<T, Prisma__session_schemaClient<session_schema | null >, Prisma__session_schemaClient<session_schemaGetPayload<T> | null >>;

    workout<T extends workoutArgs = {}>(args?: Subset<T, workoutArgs>): CheckSelect<T, Prisma__workoutClient<workout | null >, Prisma__workoutClient<workoutGetPayload<T> | null >>;

    workout_instance<T extends workout_instanceFindManyArgs = {}>(args?: Subset<T, workout_instanceFindManyArgs>): CheckSelect<T, PrismaPromise<Array<workout_instance>>, PrismaPromise<Array<workout_instanceGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * workout_schema findUnique
   */
  export type workout_schemaFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the workout_schema
     * 
    **/
    select?: workout_schemaSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: workout_schemaInclude | null
    /**
     * Throw an Error if a workout_schema can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which workout_schema to fetch.
     * 
    **/
    where: workout_schemaWhereUniqueInput
  }


  /**
   * workout_schema findFirst
   */
  export type workout_schemaFindFirstArgs = {
    /**
     * Select specific fields to fetch from the workout_schema
     * 
    **/
    select?: workout_schemaSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: workout_schemaInclude | null
    /**
     * Throw an Error if a workout_schema can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which workout_schema to fetch.
     * 
    **/
    where?: workout_schemaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of workout_schemas to fetch.
     * 
    **/
    orderBy?: Enumerable<workout_schemaOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for workout_schemas.
     * 
    **/
    cursor?: workout_schemaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` workout_schemas from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` workout_schemas.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of workout_schemas.
     * 
    **/
    distinct?: Enumerable<Workout_schemaScalarFieldEnum>
  }


  /**
   * workout_schema findMany
   */
  export type workout_schemaFindManyArgs = {
    /**
     * Select specific fields to fetch from the workout_schema
     * 
    **/
    select?: workout_schemaSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: workout_schemaInclude | null
    /**
     * Filter, which workout_schemas to fetch.
     * 
    **/
    where?: workout_schemaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of workout_schemas to fetch.
     * 
    **/
    orderBy?: Enumerable<workout_schemaOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing workout_schemas.
     * 
    **/
    cursor?: workout_schemaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` workout_schemas from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` workout_schemas.
     * 
    **/
    skip?: number
    distinct?: Enumerable<Workout_schemaScalarFieldEnum>
  }


  /**
   * workout_schema create
   */
  export type workout_schemaCreateArgs = {
    /**
     * Select specific fields to fetch from the workout_schema
     * 
    **/
    select?: workout_schemaSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: workout_schemaInclude | null
    /**
     * The data needed to create a workout_schema.
     * 
    **/
    data: XOR<workout_schemaCreateInput, workout_schemaUncheckedCreateInput>
  }


  /**
   * workout_schema createMany
   */
  export type workout_schemaCreateManyArgs = {
    /**
     * The data used to create many workout_schemas.
     * 
    **/
    data: Enumerable<workout_schemaCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * workout_schema update
   */
  export type workout_schemaUpdateArgs = {
    /**
     * Select specific fields to fetch from the workout_schema
     * 
    **/
    select?: workout_schemaSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: workout_schemaInclude | null
    /**
     * The data needed to update a workout_schema.
     * 
    **/
    data: XOR<workout_schemaUpdateInput, workout_schemaUncheckedUpdateInput>
    /**
     * Choose, which workout_schema to update.
     * 
    **/
    where: workout_schemaWhereUniqueInput
  }


  /**
   * workout_schema updateMany
   */
  export type workout_schemaUpdateManyArgs = {
    /**
     * The data used to update workout_schemas.
     * 
    **/
    data: XOR<workout_schemaUpdateManyMutationInput, workout_schemaUncheckedUpdateManyInput>
    /**
     * Filter which workout_schemas to update
     * 
    **/
    where?: workout_schemaWhereInput
  }


  /**
   * workout_schema upsert
   */
  export type workout_schemaUpsertArgs = {
    /**
     * Select specific fields to fetch from the workout_schema
     * 
    **/
    select?: workout_schemaSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: workout_schemaInclude | null
    /**
     * The filter to search for the workout_schema to update in case it exists.
     * 
    **/
    where: workout_schemaWhereUniqueInput
    /**
     * In case the workout_schema found by the `where` argument doesn't exist, create a new workout_schema with this data.
     * 
    **/
    create: XOR<workout_schemaCreateInput, workout_schemaUncheckedCreateInput>
    /**
     * In case the workout_schema was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<workout_schemaUpdateInput, workout_schemaUncheckedUpdateInput>
  }


  /**
   * workout_schema delete
   */
  export type workout_schemaDeleteArgs = {
    /**
     * Select specific fields to fetch from the workout_schema
     * 
    **/
    select?: workout_schemaSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: workout_schemaInclude | null
    /**
     * Filter which workout_schema to delete.
     * 
    **/
    where: workout_schemaWhereUniqueInput
  }


  /**
   * workout_schema deleteMany
   */
  export type workout_schemaDeleteManyArgs = {
    /**
     * Filter which workout_schemas to delete
     * 
    **/
    where?: workout_schemaWhereInput
  }


  /**
   * workout_schema without action
   */
  export type workout_schemaArgs = {
    /**
     * Select specific fields to fetch from the workout_schema
     * 
    **/
    select?: workout_schemaSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: workout_schemaInclude | null
  }



  /**
   * Model superset_schema
   */


  export type AggregateSuperset_schema = {
    _count: Superset_schemaCountAggregateOutputType | null
    _min: Superset_schemaMinAggregateOutputType | null
    _max: Superset_schemaMaxAggregateOutputType | null
  }

  export type Superset_schemaMinAggregateOutputType = {
    id: string | null
    name: string | null
    session_schema_id: string | null
  }

  export type Superset_schemaMaxAggregateOutputType = {
    id: string | null
    name: string | null
    session_schema_id: string | null
  }

  export type Superset_schemaCountAggregateOutputType = {
    id: number
    name: number
    session_schema_id: number
    _all: number
  }


  export type Superset_schemaMinAggregateInputType = {
    id?: true
    name?: true
    session_schema_id?: true
  }

  export type Superset_schemaMaxAggregateInputType = {
    id?: true
    name?: true
    session_schema_id?: true
  }

  export type Superset_schemaCountAggregateInputType = {
    id?: true
    name?: true
    session_schema_id?: true
    _all?: true
  }

  export type Superset_schemaAggregateArgs = {
    /**
     * Filter which superset_schema to aggregate.
     * 
    **/
    where?: superset_schemaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of superset_schemas to fetch.
     * 
    **/
    orderBy?: Enumerable<superset_schemaOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: superset_schemaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` superset_schemas from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` superset_schemas.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned superset_schemas
    **/
    _count?: true | Superset_schemaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Superset_schemaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Superset_schemaMaxAggregateInputType
  }

  export type GetSuperset_schemaAggregateType<T extends Superset_schemaAggregateArgs> = {
        [P in keyof T & keyof AggregateSuperset_schema]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSuperset_schema[P]>
      : GetScalarType<T[P], AggregateSuperset_schema[P]>
  }




  export type Superset_schemaGroupByArgs = {
    where?: superset_schemaWhereInput
    orderBy?: Enumerable<superset_schemaOrderByWithAggregationInput>
    by: Array<Superset_schemaScalarFieldEnum>
    having?: superset_schemaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Superset_schemaCountAggregateInputType | true
    _min?: Superset_schemaMinAggregateInputType
    _max?: Superset_schemaMaxAggregateInputType
  }


  export type Superset_schemaGroupByOutputType = {
    id: string
    name: string
    session_schema_id: string
    _count: Superset_schemaCountAggregateOutputType | null
    _min: Superset_schemaMinAggregateOutputType | null
    _max: Superset_schemaMaxAggregateOutputType | null
  }

  type GetSuperset_schemaGroupByPayload<T extends Superset_schemaGroupByArgs> = PrismaPromise<
    Array<
      PickArray<Superset_schemaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Superset_schemaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Superset_schemaGroupByOutputType[P]>
            : GetScalarType<T[P], Superset_schemaGroupByOutputType[P]>
        }
      >
    >


  export type superset_schemaSelect = {
    id?: boolean
    name?: boolean
    session_schema_id?: boolean
    session_schema?: boolean | session_schemaArgs
    superset_workout_schema?: boolean | superset_workout_schemaFindManyArgs
    _count?: boolean | Superset_schemaCountOutputTypeArgs
  }

  export type superset_schemaInclude = {
    session_schema?: boolean | session_schemaArgs
    superset_workout_schema?: boolean | superset_workout_schemaFindManyArgs
    _count?: boolean | Superset_schemaCountOutputTypeArgs
  }

  export type superset_schemaGetPayload<
    S extends boolean | null | undefined | superset_schemaArgs,
    U = keyof S
      > = S extends true
        ? superset_schema
    : S extends undefined
    ? never
    : S extends superset_schemaArgs | superset_schemaFindManyArgs
    ?'include' extends U
    ? superset_schema  & {
    [P in TrueKeys<S['include']>]:
        P extends 'session_schema' ? session_schemaGetPayload<S['include'][P]> :
        P extends 'superset_workout_schema' ? Array < superset_workout_schemaGetPayload<S['include'][P]>>  :
        P extends '_count' ? Superset_schemaCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'session_schema' ? session_schemaGetPayload<S['select'][P]> :
        P extends 'superset_workout_schema' ? Array < superset_workout_schemaGetPayload<S['select'][P]>>  :
        P extends '_count' ? Superset_schemaCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof superset_schema ? superset_schema[P] : never
  } 
    : superset_schema
  : superset_schema


  type superset_schemaCountArgs = Merge<
    Omit<superset_schemaFindManyArgs, 'select' | 'include'> & {
      select?: Superset_schemaCountAggregateInputType | true
    }
  >

  export interface superset_schemaDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Superset_schema that matches the filter.
     * @param {superset_schemaFindUniqueArgs} args - Arguments to find a Superset_schema
     * @example
     * // Get one Superset_schema
     * const superset_schema = await prisma.superset_schema.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends superset_schemaFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, superset_schemaFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'superset_schema'> extends True ? CheckSelect<T, Prisma__superset_schemaClient<superset_schema>, Prisma__superset_schemaClient<superset_schemaGetPayload<T>>> : CheckSelect<T, Prisma__superset_schemaClient<superset_schema | null >, Prisma__superset_schemaClient<superset_schemaGetPayload<T> | null >>

    /**
     * Find the first Superset_schema that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {superset_schemaFindFirstArgs} args - Arguments to find a Superset_schema
     * @example
     * // Get one Superset_schema
     * const superset_schema = await prisma.superset_schema.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends superset_schemaFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, superset_schemaFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'superset_schema'> extends True ? CheckSelect<T, Prisma__superset_schemaClient<superset_schema>, Prisma__superset_schemaClient<superset_schemaGetPayload<T>>> : CheckSelect<T, Prisma__superset_schemaClient<superset_schema | null >, Prisma__superset_schemaClient<superset_schemaGetPayload<T> | null >>

    /**
     * Find zero or more Superset_schemas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {superset_schemaFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Superset_schemas
     * const superset_schemas = await prisma.superset_schema.findMany()
     * 
     * // Get first 10 Superset_schemas
     * const superset_schemas = await prisma.superset_schema.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const superset_schemaWithIdOnly = await prisma.superset_schema.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends superset_schemaFindManyArgs>(
      args?: SelectSubset<T, superset_schemaFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<superset_schema>>, PrismaPromise<Array<superset_schemaGetPayload<T>>>>

    /**
     * Create a Superset_schema.
     * @param {superset_schemaCreateArgs} args - Arguments to create a Superset_schema.
     * @example
     * // Create one Superset_schema
     * const Superset_schema = await prisma.superset_schema.create({
     *   data: {
     *     // ... data to create a Superset_schema
     *   }
     * })
     * 
    **/
    create<T extends superset_schemaCreateArgs>(
      args: SelectSubset<T, superset_schemaCreateArgs>
    ): CheckSelect<T, Prisma__superset_schemaClient<superset_schema>, Prisma__superset_schemaClient<superset_schemaGetPayload<T>>>

    /**
     * Create many Superset_schemas.
     *     @param {superset_schemaCreateManyArgs} args - Arguments to create many Superset_schemas.
     *     @example
     *     // Create many Superset_schemas
     *     const superset_schema = await prisma.superset_schema.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends superset_schemaCreateManyArgs>(
      args?: SelectSubset<T, superset_schemaCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Superset_schema.
     * @param {superset_schemaDeleteArgs} args - Arguments to delete one Superset_schema.
     * @example
     * // Delete one Superset_schema
     * const Superset_schema = await prisma.superset_schema.delete({
     *   where: {
     *     // ... filter to delete one Superset_schema
     *   }
     * })
     * 
    **/
    delete<T extends superset_schemaDeleteArgs>(
      args: SelectSubset<T, superset_schemaDeleteArgs>
    ): CheckSelect<T, Prisma__superset_schemaClient<superset_schema>, Prisma__superset_schemaClient<superset_schemaGetPayload<T>>>

    /**
     * Update one Superset_schema.
     * @param {superset_schemaUpdateArgs} args - Arguments to update one Superset_schema.
     * @example
     * // Update one Superset_schema
     * const superset_schema = await prisma.superset_schema.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends superset_schemaUpdateArgs>(
      args: SelectSubset<T, superset_schemaUpdateArgs>
    ): CheckSelect<T, Prisma__superset_schemaClient<superset_schema>, Prisma__superset_schemaClient<superset_schemaGetPayload<T>>>

    /**
     * Delete zero or more Superset_schemas.
     * @param {superset_schemaDeleteManyArgs} args - Arguments to filter Superset_schemas to delete.
     * @example
     * // Delete a few Superset_schemas
     * const { count } = await prisma.superset_schema.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends superset_schemaDeleteManyArgs>(
      args?: SelectSubset<T, superset_schemaDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Superset_schemas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {superset_schemaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Superset_schemas
     * const superset_schema = await prisma.superset_schema.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends superset_schemaUpdateManyArgs>(
      args: SelectSubset<T, superset_schemaUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Superset_schema.
     * @param {superset_schemaUpsertArgs} args - Arguments to update or create a Superset_schema.
     * @example
     * // Update or create a Superset_schema
     * const superset_schema = await prisma.superset_schema.upsert({
     *   create: {
     *     // ... data to create a Superset_schema
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Superset_schema we want to update
     *   }
     * })
    **/
    upsert<T extends superset_schemaUpsertArgs>(
      args: SelectSubset<T, superset_schemaUpsertArgs>
    ): CheckSelect<T, Prisma__superset_schemaClient<superset_schema>, Prisma__superset_schemaClient<superset_schemaGetPayload<T>>>

    /**
     * Count the number of Superset_schemas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {superset_schemaCountArgs} args - Arguments to filter Superset_schemas to count.
     * @example
     * // Count the number of Superset_schemas
     * const count = await prisma.superset_schema.count({
     *   where: {
     *     // ... the filter for the Superset_schemas we want to count
     *   }
     * })
    **/
    count<T extends superset_schemaCountArgs>(
      args?: Subset<T, superset_schemaCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Superset_schemaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Superset_schema.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Superset_schemaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Superset_schemaAggregateArgs>(args: Subset<T, Superset_schemaAggregateArgs>): PrismaPromise<GetSuperset_schemaAggregateType<T>>

    /**
     * Group by Superset_schema.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Superset_schemaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends Superset_schemaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Superset_schemaGroupByArgs['orderBy'] }
        : { orderBy?: Superset_schemaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, Superset_schemaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSuperset_schemaGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for superset_schema.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__superset_schemaClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    session_schema<T extends session_schemaArgs = {}>(args?: Subset<T, session_schemaArgs>): CheckSelect<T, Prisma__session_schemaClient<session_schema | null >, Prisma__session_schemaClient<session_schemaGetPayload<T> | null >>;

    superset_workout_schema<T extends superset_workout_schemaFindManyArgs = {}>(args?: Subset<T, superset_workout_schemaFindManyArgs>): CheckSelect<T, PrismaPromise<Array<superset_workout_schema>>, PrismaPromise<Array<superset_workout_schemaGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * superset_schema findUnique
   */
  export type superset_schemaFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the superset_schema
     * 
    **/
    select?: superset_schemaSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: superset_schemaInclude | null
    /**
     * Throw an Error if a superset_schema can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which superset_schema to fetch.
     * 
    **/
    where: superset_schemaWhereUniqueInput
  }


  /**
   * superset_schema findFirst
   */
  export type superset_schemaFindFirstArgs = {
    /**
     * Select specific fields to fetch from the superset_schema
     * 
    **/
    select?: superset_schemaSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: superset_schemaInclude | null
    /**
     * Throw an Error if a superset_schema can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which superset_schema to fetch.
     * 
    **/
    where?: superset_schemaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of superset_schemas to fetch.
     * 
    **/
    orderBy?: Enumerable<superset_schemaOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for superset_schemas.
     * 
    **/
    cursor?: superset_schemaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` superset_schemas from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` superset_schemas.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of superset_schemas.
     * 
    **/
    distinct?: Enumerable<Superset_schemaScalarFieldEnum>
  }


  /**
   * superset_schema findMany
   */
  export type superset_schemaFindManyArgs = {
    /**
     * Select specific fields to fetch from the superset_schema
     * 
    **/
    select?: superset_schemaSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: superset_schemaInclude | null
    /**
     * Filter, which superset_schemas to fetch.
     * 
    **/
    where?: superset_schemaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of superset_schemas to fetch.
     * 
    **/
    orderBy?: Enumerable<superset_schemaOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing superset_schemas.
     * 
    **/
    cursor?: superset_schemaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` superset_schemas from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` superset_schemas.
     * 
    **/
    skip?: number
    distinct?: Enumerable<Superset_schemaScalarFieldEnum>
  }


  /**
   * superset_schema create
   */
  export type superset_schemaCreateArgs = {
    /**
     * Select specific fields to fetch from the superset_schema
     * 
    **/
    select?: superset_schemaSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: superset_schemaInclude | null
    /**
     * The data needed to create a superset_schema.
     * 
    **/
    data: XOR<superset_schemaCreateInput, superset_schemaUncheckedCreateInput>
  }


  /**
   * superset_schema createMany
   */
  export type superset_schemaCreateManyArgs = {
    /**
     * The data used to create many superset_schemas.
     * 
    **/
    data: Enumerable<superset_schemaCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * superset_schema update
   */
  export type superset_schemaUpdateArgs = {
    /**
     * Select specific fields to fetch from the superset_schema
     * 
    **/
    select?: superset_schemaSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: superset_schemaInclude | null
    /**
     * The data needed to update a superset_schema.
     * 
    **/
    data: XOR<superset_schemaUpdateInput, superset_schemaUncheckedUpdateInput>
    /**
     * Choose, which superset_schema to update.
     * 
    **/
    where: superset_schemaWhereUniqueInput
  }


  /**
   * superset_schema updateMany
   */
  export type superset_schemaUpdateManyArgs = {
    /**
     * The data used to update superset_schemas.
     * 
    **/
    data: XOR<superset_schemaUpdateManyMutationInput, superset_schemaUncheckedUpdateManyInput>
    /**
     * Filter which superset_schemas to update
     * 
    **/
    where?: superset_schemaWhereInput
  }


  /**
   * superset_schema upsert
   */
  export type superset_schemaUpsertArgs = {
    /**
     * Select specific fields to fetch from the superset_schema
     * 
    **/
    select?: superset_schemaSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: superset_schemaInclude | null
    /**
     * The filter to search for the superset_schema to update in case it exists.
     * 
    **/
    where: superset_schemaWhereUniqueInput
    /**
     * In case the superset_schema found by the `where` argument doesn't exist, create a new superset_schema with this data.
     * 
    **/
    create: XOR<superset_schemaCreateInput, superset_schemaUncheckedCreateInput>
    /**
     * In case the superset_schema was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<superset_schemaUpdateInput, superset_schemaUncheckedUpdateInput>
  }


  /**
   * superset_schema delete
   */
  export type superset_schemaDeleteArgs = {
    /**
     * Select specific fields to fetch from the superset_schema
     * 
    **/
    select?: superset_schemaSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: superset_schemaInclude | null
    /**
     * Filter which superset_schema to delete.
     * 
    **/
    where: superset_schemaWhereUniqueInput
  }


  /**
   * superset_schema deleteMany
   */
  export type superset_schemaDeleteManyArgs = {
    /**
     * Filter which superset_schemas to delete
     * 
    **/
    where?: superset_schemaWhereInput
  }


  /**
   * superset_schema without action
   */
  export type superset_schemaArgs = {
    /**
     * Select specific fields to fetch from the superset_schema
     * 
    **/
    select?: superset_schemaSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: superset_schemaInclude | null
  }



  /**
   * Model superset_workout_schema
   */


  export type AggregateSuperset_workout_schema = {
    _count: Superset_workout_schemaCountAggregateOutputType | null
    _avg: Superset_workout_schemaAvgAggregateOutputType | null
    _sum: Superset_workout_schemaSumAggregateOutputType | null
    _min: Superset_workout_schemaMinAggregateOutputType | null
    _max: Superset_workout_schemaMaxAggregateOutputType | null
  }

  export type Superset_workout_schemaAvgAggregateOutputType = {
    order: number | null
  }

  export type Superset_workout_schemaSumAggregateOutputType = {
    order: number | null
  }

  export type Superset_workout_schemaMinAggregateOutputType = {
    id: string | null
    superset_schema_id: string | null
    workout_id: string | null
    order: number | null
  }

  export type Superset_workout_schemaMaxAggregateOutputType = {
    id: string | null
    superset_schema_id: string | null
    workout_id: string | null
    order: number | null
  }

  export type Superset_workout_schemaCountAggregateOutputType = {
    id: number
    superset_schema_id: number
    workout_id: number
    default_target: number
    order: number
    _all: number
  }


  export type Superset_workout_schemaAvgAggregateInputType = {
    order?: true
  }

  export type Superset_workout_schemaSumAggregateInputType = {
    order?: true
  }

  export type Superset_workout_schemaMinAggregateInputType = {
    id?: true
    superset_schema_id?: true
    workout_id?: true
    order?: true
  }

  export type Superset_workout_schemaMaxAggregateInputType = {
    id?: true
    superset_schema_id?: true
    workout_id?: true
    order?: true
  }

  export type Superset_workout_schemaCountAggregateInputType = {
    id?: true
    superset_schema_id?: true
    workout_id?: true
    default_target?: true
    order?: true
    _all?: true
  }

  export type Superset_workout_schemaAggregateArgs = {
    /**
     * Filter which superset_workout_schema to aggregate.
     * 
    **/
    where?: superset_workout_schemaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of superset_workout_schemas to fetch.
     * 
    **/
    orderBy?: Enumerable<superset_workout_schemaOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: superset_workout_schemaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` superset_workout_schemas from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` superset_workout_schemas.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned superset_workout_schemas
    **/
    _count?: true | Superset_workout_schemaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Superset_workout_schemaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Superset_workout_schemaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Superset_workout_schemaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Superset_workout_schemaMaxAggregateInputType
  }

  export type GetSuperset_workout_schemaAggregateType<T extends Superset_workout_schemaAggregateArgs> = {
        [P in keyof T & keyof AggregateSuperset_workout_schema]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSuperset_workout_schema[P]>
      : GetScalarType<T[P], AggregateSuperset_workout_schema[P]>
  }




  export type Superset_workout_schemaGroupByArgs = {
    where?: superset_workout_schemaWhereInput
    orderBy?: Enumerable<superset_workout_schemaOrderByWithAggregationInput>
    by: Array<Superset_workout_schemaScalarFieldEnum>
    having?: superset_workout_schemaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Superset_workout_schemaCountAggregateInputType | true
    _avg?: Superset_workout_schemaAvgAggregateInputType
    _sum?: Superset_workout_schemaSumAggregateInputType
    _min?: Superset_workout_schemaMinAggregateInputType
    _max?: Superset_workout_schemaMaxAggregateInputType
  }


  export type Superset_workout_schemaGroupByOutputType = {
    id: string
    superset_schema_id: string
    workout_id: string
    default_target: JsonValue
    order: number
    _count: Superset_workout_schemaCountAggregateOutputType | null
    _avg: Superset_workout_schemaAvgAggregateOutputType | null
    _sum: Superset_workout_schemaSumAggregateOutputType | null
    _min: Superset_workout_schemaMinAggregateOutputType | null
    _max: Superset_workout_schemaMaxAggregateOutputType | null
  }

  type GetSuperset_workout_schemaGroupByPayload<T extends Superset_workout_schemaGroupByArgs> = PrismaPromise<
    Array<
      PickArray<Superset_workout_schemaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Superset_workout_schemaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Superset_workout_schemaGroupByOutputType[P]>
            : GetScalarType<T[P], Superset_workout_schemaGroupByOutputType[P]>
        }
      >
    >


  export type superset_workout_schemaSelect = {
    id?: boolean
    superset_schema_id?: boolean
    superset_schema?: boolean | superset_schemaArgs
    workout_id?: boolean
    workout?: boolean | workoutArgs
    default_target?: boolean
    order?: boolean
    superset_workout_instance?: boolean | superset_workout_instanceFindManyArgs
    _count?: boolean | Superset_workout_schemaCountOutputTypeArgs
  }

  export type superset_workout_schemaInclude = {
    superset_schema?: boolean | superset_schemaArgs
    workout?: boolean | workoutArgs
    superset_workout_instance?: boolean | superset_workout_instanceFindManyArgs
    _count?: boolean | Superset_workout_schemaCountOutputTypeArgs
  }

  export type superset_workout_schemaGetPayload<
    S extends boolean | null | undefined | superset_workout_schemaArgs,
    U = keyof S
      > = S extends true
        ? superset_workout_schema
    : S extends undefined
    ? never
    : S extends superset_workout_schemaArgs | superset_workout_schemaFindManyArgs
    ?'include' extends U
    ? superset_workout_schema  & {
    [P in TrueKeys<S['include']>]:
        P extends 'superset_schema' ? superset_schemaGetPayload<S['include'][P]> :
        P extends 'workout' ? workoutGetPayload<S['include'][P]> :
        P extends 'superset_workout_instance' ? Array < superset_workout_instanceGetPayload<S['include'][P]>>  :
        P extends '_count' ? Superset_workout_schemaCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'superset_schema' ? superset_schemaGetPayload<S['select'][P]> :
        P extends 'workout' ? workoutGetPayload<S['select'][P]> :
        P extends 'superset_workout_instance' ? Array < superset_workout_instanceGetPayload<S['select'][P]>>  :
        P extends '_count' ? Superset_workout_schemaCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof superset_workout_schema ? superset_workout_schema[P] : never
  } 
    : superset_workout_schema
  : superset_workout_schema


  type superset_workout_schemaCountArgs = Merge<
    Omit<superset_workout_schemaFindManyArgs, 'select' | 'include'> & {
      select?: Superset_workout_schemaCountAggregateInputType | true
    }
  >

  export interface superset_workout_schemaDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Superset_workout_schema that matches the filter.
     * @param {superset_workout_schemaFindUniqueArgs} args - Arguments to find a Superset_workout_schema
     * @example
     * // Get one Superset_workout_schema
     * const superset_workout_schema = await prisma.superset_workout_schema.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends superset_workout_schemaFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, superset_workout_schemaFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'superset_workout_schema'> extends True ? CheckSelect<T, Prisma__superset_workout_schemaClient<superset_workout_schema>, Prisma__superset_workout_schemaClient<superset_workout_schemaGetPayload<T>>> : CheckSelect<T, Prisma__superset_workout_schemaClient<superset_workout_schema | null >, Prisma__superset_workout_schemaClient<superset_workout_schemaGetPayload<T> | null >>

    /**
     * Find the first Superset_workout_schema that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {superset_workout_schemaFindFirstArgs} args - Arguments to find a Superset_workout_schema
     * @example
     * // Get one Superset_workout_schema
     * const superset_workout_schema = await prisma.superset_workout_schema.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends superset_workout_schemaFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, superset_workout_schemaFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'superset_workout_schema'> extends True ? CheckSelect<T, Prisma__superset_workout_schemaClient<superset_workout_schema>, Prisma__superset_workout_schemaClient<superset_workout_schemaGetPayload<T>>> : CheckSelect<T, Prisma__superset_workout_schemaClient<superset_workout_schema | null >, Prisma__superset_workout_schemaClient<superset_workout_schemaGetPayload<T> | null >>

    /**
     * Find zero or more Superset_workout_schemas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {superset_workout_schemaFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Superset_workout_schemas
     * const superset_workout_schemas = await prisma.superset_workout_schema.findMany()
     * 
     * // Get first 10 Superset_workout_schemas
     * const superset_workout_schemas = await prisma.superset_workout_schema.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const superset_workout_schemaWithIdOnly = await prisma.superset_workout_schema.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends superset_workout_schemaFindManyArgs>(
      args?: SelectSubset<T, superset_workout_schemaFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<superset_workout_schema>>, PrismaPromise<Array<superset_workout_schemaGetPayload<T>>>>

    /**
     * Create a Superset_workout_schema.
     * @param {superset_workout_schemaCreateArgs} args - Arguments to create a Superset_workout_schema.
     * @example
     * // Create one Superset_workout_schema
     * const Superset_workout_schema = await prisma.superset_workout_schema.create({
     *   data: {
     *     // ... data to create a Superset_workout_schema
     *   }
     * })
     * 
    **/
    create<T extends superset_workout_schemaCreateArgs>(
      args: SelectSubset<T, superset_workout_schemaCreateArgs>
    ): CheckSelect<T, Prisma__superset_workout_schemaClient<superset_workout_schema>, Prisma__superset_workout_schemaClient<superset_workout_schemaGetPayload<T>>>

    /**
     * Create many Superset_workout_schemas.
     *     @param {superset_workout_schemaCreateManyArgs} args - Arguments to create many Superset_workout_schemas.
     *     @example
     *     // Create many Superset_workout_schemas
     *     const superset_workout_schema = await prisma.superset_workout_schema.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends superset_workout_schemaCreateManyArgs>(
      args?: SelectSubset<T, superset_workout_schemaCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Superset_workout_schema.
     * @param {superset_workout_schemaDeleteArgs} args - Arguments to delete one Superset_workout_schema.
     * @example
     * // Delete one Superset_workout_schema
     * const Superset_workout_schema = await prisma.superset_workout_schema.delete({
     *   where: {
     *     // ... filter to delete one Superset_workout_schema
     *   }
     * })
     * 
    **/
    delete<T extends superset_workout_schemaDeleteArgs>(
      args: SelectSubset<T, superset_workout_schemaDeleteArgs>
    ): CheckSelect<T, Prisma__superset_workout_schemaClient<superset_workout_schema>, Prisma__superset_workout_schemaClient<superset_workout_schemaGetPayload<T>>>

    /**
     * Update one Superset_workout_schema.
     * @param {superset_workout_schemaUpdateArgs} args - Arguments to update one Superset_workout_schema.
     * @example
     * // Update one Superset_workout_schema
     * const superset_workout_schema = await prisma.superset_workout_schema.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends superset_workout_schemaUpdateArgs>(
      args: SelectSubset<T, superset_workout_schemaUpdateArgs>
    ): CheckSelect<T, Prisma__superset_workout_schemaClient<superset_workout_schema>, Prisma__superset_workout_schemaClient<superset_workout_schemaGetPayload<T>>>

    /**
     * Delete zero or more Superset_workout_schemas.
     * @param {superset_workout_schemaDeleteManyArgs} args - Arguments to filter Superset_workout_schemas to delete.
     * @example
     * // Delete a few Superset_workout_schemas
     * const { count } = await prisma.superset_workout_schema.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends superset_workout_schemaDeleteManyArgs>(
      args?: SelectSubset<T, superset_workout_schemaDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Superset_workout_schemas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {superset_workout_schemaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Superset_workout_schemas
     * const superset_workout_schema = await prisma.superset_workout_schema.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends superset_workout_schemaUpdateManyArgs>(
      args: SelectSubset<T, superset_workout_schemaUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Superset_workout_schema.
     * @param {superset_workout_schemaUpsertArgs} args - Arguments to update or create a Superset_workout_schema.
     * @example
     * // Update or create a Superset_workout_schema
     * const superset_workout_schema = await prisma.superset_workout_schema.upsert({
     *   create: {
     *     // ... data to create a Superset_workout_schema
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Superset_workout_schema we want to update
     *   }
     * })
    **/
    upsert<T extends superset_workout_schemaUpsertArgs>(
      args: SelectSubset<T, superset_workout_schemaUpsertArgs>
    ): CheckSelect<T, Prisma__superset_workout_schemaClient<superset_workout_schema>, Prisma__superset_workout_schemaClient<superset_workout_schemaGetPayload<T>>>

    /**
     * Count the number of Superset_workout_schemas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {superset_workout_schemaCountArgs} args - Arguments to filter Superset_workout_schemas to count.
     * @example
     * // Count the number of Superset_workout_schemas
     * const count = await prisma.superset_workout_schema.count({
     *   where: {
     *     // ... the filter for the Superset_workout_schemas we want to count
     *   }
     * })
    **/
    count<T extends superset_workout_schemaCountArgs>(
      args?: Subset<T, superset_workout_schemaCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Superset_workout_schemaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Superset_workout_schema.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Superset_workout_schemaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Superset_workout_schemaAggregateArgs>(args: Subset<T, Superset_workout_schemaAggregateArgs>): PrismaPromise<GetSuperset_workout_schemaAggregateType<T>>

    /**
     * Group by Superset_workout_schema.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Superset_workout_schemaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends Superset_workout_schemaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Superset_workout_schemaGroupByArgs['orderBy'] }
        : { orderBy?: Superset_workout_schemaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, Superset_workout_schemaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSuperset_workout_schemaGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for superset_workout_schema.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__superset_workout_schemaClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    superset_schema<T extends superset_schemaArgs = {}>(args?: Subset<T, superset_schemaArgs>): CheckSelect<T, Prisma__superset_schemaClient<superset_schema | null >, Prisma__superset_schemaClient<superset_schemaGetPayload<T> | null >>;

    workout<T extends workoutArgs = {}>(args?: Subset<T, workoutArgs>): CheckSelect<T, Prisma__workoutClient<workout | null >, Prisma__workoutClient<workoutGetPayload<T> | null >>;

    superset_workout_instance<T extends superset_workout_instanceFindManyArgs = {}>(args?: Subset<T, superset_workout_instanceFindManyArgs>): CheckSelect<T, PrismaPromise<Array<superset_workout_instance>>, PrismaPromise<Array<superset_workout_instanceGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * superset_workout_schema findUnique
   */
  export type superset_workout_schemaFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the superset_workout_schema
     * 
    **/
    select?: superset_workout_schemaSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: superset_workout_schemaInclude | null
    /**
     * Throw an Error if a superset_workout_schema can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which superset_workout_schema to fetch.
     * 
    **/
    where: superset_workout_schemaWhereUniqueInput
  }


  /**
   * superset_workout_schema findFirst
   */
  export type superset_workout_schemaFindFirstArgs = {
    /**
     * Select specific fields to fetch from the superset_workout_schema
     * 
    **/
    select?: superset_workout_schemaSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: superset_workout_schemaInclude | null
    /**
     * Throw an Error if a superset_workout_schema can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which superset_workout_schema to fetch.
     * 
    **/
    where?: superset_workout_schemaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of superset_workout_schemas to fetch.
     * 
    **/
    orderBy?: Enumerable<superset_workout_schemaOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for superset_workout_schemas.
     * 
    **/
    cursor?: superset_workout_schemaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` superset_workout_schemas from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` superset_workout_schemas.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of superset_workout_schemas.
     * 
    **/
    distinct?: Enumerable<Superset_workout_schemaScalarFieldEnum>
  }


  /**
   * superset_workout_schema findMany
   */
  export type superset_workout_schemaFindManyArgs = {
    /**
     * Select specific fields to fetch from the superset_workout_schema
     * 
    **/
    select?: superset_workout_schemaSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: superset_workout_schemaInclude | null
    /**
     * Filter, which superset_workout_schemas to fetch.
     * 
    **/
    where?: superset_workout_schemaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of superset_workout_schemas to fetch.
     * 
    **/
    orderBy?: Enumerable<superset_workout_schemaOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing superset_workout_schemas.
     * 
    **/
    cursor?: superset_workout_schemaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` superset_workout_schemas from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` superset_workout_schemas.
     * 
    **/
    skip?: number
    distinct?: Enumerable<Superset_workout_schemaScalarFieldEnum>
  }


  /**
   * superset_workout_schema create
   */
  export type superset_workout_schemaCreateArgs = {
    /**
     * Select specific fields to fetch from the superset_workout_schema
     * 
    **/
    select?: superset_workout_schemaSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: superset_workout_schemaInclude | null
    /**
     * The data needed to create a superset_workout_schema.
     * 
    **/
    data: XOR<superset_workout_schemaCreateInput, superset_workout_schemaUncheckedCreateInput>
  }


  /**
   * superset_workout_schema createMany
   */
  export type superset_workout_schemaCreateManyArgs = {
    /**
     * The data used to create many superset_workout_schemas.
     * 
    **/
    data: Enumerable<superset_workout_schemaCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * superset_workout_schema update
   */
  export type superset_workout_schemaUpdateArgs = {
    /**
     * Select specific fields to fetch from the superset_workout_schema
     * 
    **/
    select?: superset_workout_schemaSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: superset_workout_schemaInclude | null
    /**
     * The data needed to update a superset_workout_schema.
     * 
    **/
    data: XOR<superset_workout_schemaUpdateInput, superset_workout_schemaUncheckedUpdateInput>
    /**
     * Choose, which superset_workout_schema to update.
     * 
    **/
    where: superset_workout_schemaWhereUniqueInput
  }


  /**
   * superset_workout_schema updateMany
   */
  export type superset_workout_schemaUpdateManyArgs = {
    /**
     * The data used to update superset_workout_schemas.
     * 
    **/
    data: XOR<superset_workout_schemaUpdateManyMutationInput, superset_workout_schemaUncheckedUpdateManyInput>
    /**
     * Filter which superset_workout_schemas to update
     * 
    **/
    where?: superset_workout_schemaWhereInput
  }


  /**
   * superset_workout_schema upsert
   */
  export type superset_workout_schemaUpsertArgs = {
    /**
     * Select specific fields to fetch from the superset_workout_schema
     * 
    **/
    select?: superset_workout_schemaSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: superset_workout_schemaInclude | null
    /**
     * The filter to search for the superset_workout_schema to update in case it exists.
     * 
    **/
    where: superset_workout_schemaWhereUniqueInput
    /**
     * In case the superset_workout_schema found by the `where` argument doesn't exist, create a new superset_workout_schema with this data.
     * 
    **/
    create: XOR<superset_workout_schemaCreateInput, superset_workout_schemaUncheckedCreateInput>
    /**
     * In case the superset_workout_schema was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<superset_workout_schemaUpdateInput, superset_workout_schemaUncheckedUpdateInput>
  }


  /**
   * superset_workout_schema delete
   */
  export type superset_workout_schemaDeleteArgs = {
    /**
     * Select specific fields to fetch from the superset_workout_schema
     * 
    **/
    select?: superset_workout_schemaSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: superset_workout_schemaInclude | null
    /**
     * Filter which superset_workout_schema to delete.
     * 
    **/
    where: superset_workout_schemaWhereUniqueInput
  }


  /**
   * superset_workout_schema deleteMany
   */
  export type superset_workout_schemaDeleteManyArgs = {
    /**
     * Filter which superset_workout_schemas to delete
     * 
    **/
    where?: superset_workout_schemaWhereInput
  }


  /**
   * superset_workout_schema without action
   */
  export type superset_workout_schemaArgs = {
    /**
     * Select specific fields to fetch from the superset_workout_schema
     * 
    **/
    select?: superset_workout_schemaSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: superset_workout_schemaInclude | null
  }



  /**
   * Model session_instance
   */


  export type AggregateSession_instance = {
    _count: Session_instanceCountAggregateOutputType | null
    _min: Session_instanceMinAggregateOutputType | null
    _max: Session_instanceMaxAggregateOutputType | null
  }

  export type Session_instanceMinAggregateOutputType = {
    id: string | null
    session_schema_id: string | null
    start_timestamp: Date | null
    end_timestamp: Date | null
  }

  export type Session_instanceMaxAggregateOutputType = {
    id: string | null
    session_schema_id: string | null
    start_timestamp: Date | null
    end_timestamp: Date | null
  }

  export type Session_instanceCountAggregateOutputType = {
    id: number
    session_schema_id: number
    start_timestamp: number
    end_timestamp: number
    _all: number
  }


  export type Session_instanceMinAggregateInputType = {
    id?: true
    session_schema_id?: true
    start_timestamp?: true
    end_timestamp?: true
  }

  export type Session_instanceMaxAggregateInputType = {
    id?: true
    session_schema_id?: true
    start_timestamp?: true
    end_timestamp?: true
  }

  export type Session_instanceCountAggregateInputType = {
    id?: true
    session_schema_id?: true
    start_timestamp?: true
    end_timestamp?: true
    _all?: true
  }

  export type Session_instanceAggregateArgs = {
    /**
     * Filter which session_instance to aggregate.
     * 
    **/
    where?: session_instanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of session_instances to fetch.
     * 
    **/
    orderBy?: Enumerable<session_instanceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: session_instanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` session_instances from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` session_instances.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned session_instances
    **/
    _count?: true | Session_instanceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Session_instanceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Session_instanceMaxAggregateInputType
  }

  export type GetSession_instanceAggregateType<T extends Session_instanceAggregateArgs> = {
        [P in keyof T & keyof AggregateSession_instance]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession_instance[P]>
      : GetScalarType<T[P], AggregateSession_instance[P]>
  }




  export type Session_instanceGroupByArgs = {
    where?: session_instanceWhereInput
    orderBy?: Enumerable<session_instanceOrderByWithAggregationInput>
    by: Array<Session_instanceScalarFieldEnum>
    having?: session_instanceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Session_instanceCountAggregateInputType | true
    _min?: Session_instanceMinAggregateInputType
    _max?: Session_instanceMaxAggregateInputType
  }


  export type Session_instanceGroupByOutputType = {
    id: string
    session_schema_id: string
    start_timestamp: Date
    end_timestamp: Date | null
    _count: Session_instanceCountAggregateOutputType | null
    _min: Session_instanceMinAggregateOutputType | null
    _max: Session_instanceMaxAggregateOutputType | null
  }

  type GetSession_instanceGroupByPayload<T extends Session_instanceGroupByArgs> = PrismaPromise<
    Array<
      PickArray<Session_instanceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Session_instanceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Session_instanceGroupByOutputType[P]>
            : GetScalarType<T[P], Session_instanceGroupByOutputType[P]>
        }
      >
    >


  export type session_instanceSelect = {
    id?: boolean
    session_schema_id?: boolean
    session_schema?: boolean | session_schemaArgs
    start_timestamp?: boolean
    end_timestamp?: boolean
    workout_instance?: boolean | workout_instanceFindManyArgs
    superset_workout_instance?: boolean | superset_workout_instanceFindManyArgs
    _count?: boolean | Session_instanceCountOutputTypeArgs
  }

  export type session_instanceInclude = {
    session_schema?: boolean | session_schemaArgs
    workout_instance?: boolean | workout_instanceFindManyArgs
    superset_workout_instance?: boolean | superset_workout_instanceFindManyArgs
    _count?: boolean | Session_instanceCountOutputTypeArgs
  }

  export type session_instanceGetPayload<
    S extends boolean | null | undefined | session_instanceArgs,
    U = keyof S
      > = S extends true
        ? session_instance
    : S extends undefined
    ? never
    : S extends session_instanceArgs | session_instanceFindManyArgs
    ?'include' extends U
    ? session_instance  & {
    [P in TrueKeys<S['include']>]:
        P extends 'session_schema' ? session_schemaGetPayload<S['include'][P]> :
        P extends 'workout_instance' ? Array < workout_instanceGetPayload<S['include'][P]>>  :
        P extends 'superset_workout_instance' ? Array < superset_workout_instanceGetPayload<S['include'][P]>>  :
        P extends '_count' ? Session_instanceCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'session_schema' ? session_schemaGetPayload<S['select'][P]> :
        P extends 'workout_instance' ? Array < workout_instanceGetPayload<S['select'][P]>>  :
        P extends 'superset_workout_instance' ? Array < superset_workout_instanceGetPayload<S['select'][P]>>  :
        P extends '_count' ? Session_instanceCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof session_instance ? session_instance[P] : never
  } 
    : session_instance
  : session_instance


  type session_instanceCountArgs = Merge<
    Omit<session_instanceFindManyArgs, 'select' | 'include'> & {
      select?: Session_instanceCountAggregateInputType | true
    }
  >

  export interface session_instanceDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Session_instance that matches the filter.
     * @param {session_instanceFindUniqueArgs} args - Arguments to find a Session_instance
     * @example
     * // Get one Session_instance
     * const session_instance = await prisma.session_instance.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends session_instanceFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, session_instanceFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'session_instance'> extends True ? CheckSelect<T, Prisma__session_instanceClient<session_instance>, Prisma__session_instanceClient<session_instanceGetPayload<T>>> : CheckSelect<T, Prisma__session_instanceClient<session_instance | null >, Prisma__session_instanceClient<session_instanceGetPayload<T> | null >>

    /**
     * Find the first Session_instance that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {session_instanceFindFirstArgs} args - Arguments to find a Session_instance
     * @example
     * // Get one Session_instance
     * const session_instance = await prisma.session_instance.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends session_instanceFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, session_instanceFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'session_instance'> extends True ? CheckSelect<T, Prisma__session_instanceClient<session_instance>, Prisma__session_instanceClient<session_instanceGetPayload<T>>> : CheckSelect<T, Prisma__session_instanceClient<session_instance | null >, Prisma__session_instanceClient<session_instanceGetPayload<T> | null >>

    /**
     * Find zero or more Session_instances that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {session_instanceFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Session_instances
     * const session_instances = await prisma.session_instance.findMany()
     * 
     * // Get first 10 Session_instances
     * const session_instances = await prisma.session_instance.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const session_instanceWithIdOnly = await prisma.session_instance.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends session_instanceFindManyArgs>(
      args?: SelectSubset<T, session_instanceFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<session_instance>>, PrismaPromise<Array<session_instanceGetPayload<T>>>>

    /**
     * Create a Session_instance.
     * @param {session_instanceCreateArgs} args - Arguments to create a Session_instance.
     * @example
     * // Create one Session_instance
     * const Session_instance = await prisma.session_instance.create({
     *   data: {
     *     // ... data to create a Session_instance
     *   }
     * })
     * 
    **/
    create<T extends session_instanceCreateArgs>(
      args: SelectSubset<T, session_instanceCreateArgs>
    ): CheckSelect<T, Prisma__session_instanceClient<session_instance>, Prisma__session_instanceClient<session_instanceGetPayload<T>>>

    /**
     * Create many Session_instances.
     *     @param {session_instanceCreateManyArgs} args - Arguments to create many Session_instances.
     *     @example
     *     // Create many Session_instances
     *     const session_instance = await prisma.session_instance.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends session_instanceCreateManyArgs>(
      args?: SelectSubset<T, session_instanceCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Session_instance.
     * @param {session_instanceDeleteArgs} args - Arguments to delete one Session_instance.
     * @example
     * // Delete one Session_instance
     * const Session_instance = await prisma.session_instance.delete({
     *   where: {
     *     // ... filter to delete one Session_instance
     *   }
     * })
     * 
    **/
    delete<T extends session_instanceDeleteArgs>(
      args: SelectSubset<T, session_instanceDeleteArgs>
    ): CheckSelect<T, Prisma__session_instanceClient<session_instance>, Prisma__session_instanceClient<session_instanceGetPayload<T>>>

    /**
     * Update one Session_instance.
     * @param {session_instanceUpdateArgs} args - Arguments to update one Session_instance.
     * @example
     * // Update one Session_instance
     * const session_instance = await prisma.session_instance.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends session_instanceUpdateArgs>(
      args: SelectSubset<T, session_instanceUpdateArgs>
    ): CheckSelect<T, Prisma__session_instanceClient<session_instance>, Prisma__session_instanceClient<session_instanceGetPayload<T>>>

    /**
     * Delete zero or more Session_instances.
     * @param {session_instanceDeleteManyArgs} args - Arguments to filter Session_instances to delete.
     * @example
     * // Delete a few Session_instances
     * const { count } = await prisma.session_instance.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends session_instanceDeleteManyArgs>(
      args?: SelectSubset<T, session_instanceDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Session_instances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {session_instanceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Session_instances
     * const session_instance = await prisma.session_instance.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends session_instanceUpdateManyArgs>(
      args: SelectSubset<T, session_instanceUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Session_instance.
     * @param {session_instanceUpsertArgs} args - Arguments to update or create a Session_instance.
     * @example
     * // Update or create a Session_instance
     * const session_instance = await prisma.session_instance.upsert({
     *   create: {
     *     // ... data to create a Session_instance
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session_instance we want to update
     *   }
     * })
    **/
    upsert<T extends session_instanceUpsertArgs>(
      args: SelectSubset<T, session_instanceUpsertArgs>
    ): CheckSelect<T, Prisma__session_instanceClient<session_instance>, Prisma__session_instanceClient<session_instanceGetPayload<T>>>

    /**
     * Count the number of Session_instances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {session_instanceCountArgs} args - Arguments to filter Session_instances to count.
     * @example
     * // Count the number of Session_instances
     * const count = await prisma.session_instance.count({
     *   where: {
     *     // ... the filter for the Session_instances we want to count
     *   }
     * })
    **/
    count<T extends session_instanceCountArgs>(
      args?: Subset<T, session_instanceCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Session_instanceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session_instance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Session_instanceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Session_instanceAggregateArgs>(args: Subset<T, Session_instanceAggregateArgs>): PrismaPromise<GetSession_instanceAggregateType<T>>

    /**
     * Group by Session_instance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Session_instanceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends Session_instanceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Session_instanceGroupByArgs['orderBy'] }
        : { orderBy?: Session_instanceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, Session_instanceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSession_instanceGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for session_instance.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__session_instanceClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    session_schema<T extends session_schemaArgs = {}>(args?: Subset<T, session_schemaArgs>): CheckSelect<T, Prisma__session_schemaClient<session_schema | null >, Prisma__session_schemaClient<session_schemaGetPayload<T> | null >>;

    workout_instance<T extends workout_instanceFindManyArgs = {}>(args?: Subset<T, workout_instanceFindManyArgs>): CheckSelect<T, PrismaPromise<Array<workout_instance>>, PrismaPromise<Array<workout_instanceGetPayload<T>>>>;

    superset_workout_instance<T extends superset_workout_instanceFindManyArgs = {}>(args?: Subset<T, superset_workout_instanceFindManyArgs>): CheckSelect<T, PrismaPromise<Array<superset_workout_instance>>, PrismaPromise<Array<superset_workout_instanceGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * session_instance findUnique
   */
  export type session_instanceFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the session_instance
     * 
    **/
    select?: session_instanceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: session_instanceInclude | null
    /**
     * Throw an Error if a session_instance can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which session_instance to fetch.
     * 
    **/
    where: session_instanceWhereUniqueInput
  }


  /**
   * session_instance findFirst
   */
  export type session_instanceFindFirstArgs = {
    /**
     * Select specific fields to fetch from the session_instance
     * 
    **/
    select?: session_instanceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: session_instanceInclude | null
    /**
     * Throw an Error if a session_instance can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which session_instance to fetch.
     * 
    **/
    where?: session_instanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of session_instances to fetch.
     * 
    **/
    orderBy?: Enumerable<session_instanceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for session_instances.
     * 
    **/
    cursor?: session_instanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` session_instances from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` session_instances.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of session_instances.
     * 
    **/
    distinct?: Enumerable<Session_instanceScalarFieldEnum>
  }


  /**
   * session_instance findMany
   */
  export type session_instanceFindManyArgs = {
    /**
     * Select specific fields to fetch from the session_instance
     * 
    **/
    select?: session_instanceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: session_instanceInclude | null
    /**
     * Filter, which session_instances to fetch.
     * 
    **/
    where?: session_instanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of session_instances to fetch.
     * 
    **/
    orderBy?: Enumerable<session_instanceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing session_instances.
     * 
    **/
    cursor?: session_instanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` session_instances from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` session_instances.
     * 
    **/
    skip?: number
    distinct?: Enumerable<Session_instanceScalarFieldEnum>
  }


  /**
   * session_instance create
   */
  export type session_instanceCreateArgs = {
    /**
     * Select specific fields to fetch from the session_instance
     * 
    **/
    select?: session_instanceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: session_instanceInclude | null
    /**
     * The data needed to create a session_instance.
     * 
    **/
    data: XOR<session_instanceCreateInput, session_instanceUncheckedCreateInput>
  }


  /**
   * session_instance createMany
   */
  export type session_instanceCreateManyArgs = {
    /**
     * The data used to create many session_instances.
     * 
    **/
    data: Enumerable<session_instanceCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * session_instance update
   */
  export type session_instanceUpdateArgs = {
    /**
     * Select specific fields to fetch from the session_instance
     * 
    **/
    select?: session_instanceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: session_instanceInclude | null
    /**
     * The data needed to update a session_instance.
     * 
    **/
    data: XOR<session_instanceUpdateInput, session_instanceUncheckedUpdateInput>
    /**
     * Choose, which session_instance to update.
     * 
    **/
    where: session_instanceWhereUniqueInput
  }


  /**
   * session_instance updateMany
   */
  export type session_instanceUpdateManyArgs = {
    /**
     * The data used to update session_instances.
     * 
    **/
    data: XOR<session_instanceUpdateManyMutationInput, session_instanceUncheckedUpdateManyInput>
    /**
     * Filter which session_instances to update
     * 
    **/
    where?: session_instanceWhereInput
  }


  /**
   * session_instance upsert
   */
  export type session_instanceUpsertArgs = {
    /**
     * Select specific fields to fetch from the session_instance
     * 
    **/
    select?: session_instanceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: session_instanceInclude | null
    /**
     * The filter to search for the session_instance to update in case it exists.
     * 
    **/
    where: session_instanceWhereUniqueInput
    /**
     * In case the session_instance found by the `where` argument doesn't exist, create a new session_instance with this data.
     * 
    **/
    create: XOR<session_instanceCreateInput, session_instanceUncheckedCreateInput>
    /**
     * In case the session_instance was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<session_instanceUpdateInput, session_instanceUncheckedUpdateInput>
  }


  /**
   * session_instance delete
   */
  export type session_instanceDeleteArgs = {
    /**
     * Select specific fields to fetch from the session_instance
     * 
    **/
    select?: session_instanceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: session_instanceInclude | null
    /**
     * Filter which session_instance to delete.
     * 
    **/
    where: session_instanceWhereUniqueInput
  }


  /**
   * session_instance deleteMany
   */
  export type session_instanceDeleteManyArgs = {
    /**
     * Filter which session_instances to delete
     * 
    **/
    where?: session_instanceWhereInput
  }


  /**
   * session_instance without action
   */
  export type session_instanceArgs = {
    /**
     * Select specific fields to fetch from the session_instance
     * 
    **/
    select?: session_instanceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: session_instanceInclude | null
  }



  /**
   * Model workout_instance
   */


  export type AggregateWorkout_instance = {
    _count: Workout_instanceCountAggregateOutputType | null
    _min: Workout_instanceMinAggregateOutputType | null
    _max: Workout_instanceMaxAggregateOutputType | null
  }

  export type Workout_instanceMinAggregateOutputType = {
    workout_schema_id: string | null
    session_instance_id: string | null
  }

  export type Workout_instanceMaxAggregateOutputType = {
    workout_schema_id: string | null
    session_instance_id: string | null
  }

  export type Workout_instanceCountAggregateOutputType = {
    workout_schema_id: number
    session_instance_id: number
    sets_data: number
    _all: number
  }


  export type Workout_instanceMinAggregateInputType = {
    workout_schema_id?: true
    session_instance_id?: true
  }

  export type Workout_instanceMaxAggregateInputType = {
    workout_schema_id?: true
    session_instance_id?: true
  }

  export type Workout_instanceCountAggregateInputType = {
    workout_schema_id?: true
    session_instance_id?: true
    sets_data?: true
    _all?: true
  }

  export type Workout_instanceAggregateArgs = {
    /**
     * Filter which workout_instance to aggregate.
     * 
    **/
    where?: workout_instanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of workout_instances to fetch.
     * 
    **/
    orderBy?: Enumerable<workout_instanceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: workout_instanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` workout_instances from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` workout_instances.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned workout_instances
    **/
    _count?: true | Workout_instanceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Workout_instanceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Workout_instanceMaxAggregateInputType
  }

  export type GetWorkout_instanceAggregateType<T extends Workout_instanceAggregateArgs> = {
        [P in keyof T & keyof AggregateWorkout_instance]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkout_instance[P]>
      : GetScalarType<T[P], AggregateWorkout_instance[P]>
  }




  export type Workout_instanceGroupByArgs = {
    where?: workout_instanceWhereInput
    orderBy?: Enumerable<workout_instanceOrderByWithAggregationInput>
    by: Array<Workout_instanceScalarFieldEnum>
    having?: workout_instanceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Workout_instanceCountAggregateInputType | true
    _min?: Workout_instanceMinAggregateInputType
    _max?: Workout_instanceMaxAggregateInputType
  }


  export type Workout_instanceGroupByOutputType = {
    workout_schema_id: string
    session_instance_id: string
    sets_data: JsonValue
    _count: Workout_instanceCountAggregateOutputType | null
    _min: Workout_instanceMinAggregateOutputType | null
    _max: Workout_instanceMaxAggregateOutputType | null
  }

  type GetWorkout_instanceGroupByPayload<T extends Workout_instanceGroupByArgs> = PrismaPromise<
    Array<
      PickArray<Workout_instanceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Workout_instanceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Workout_instanceGroupByOutputType[P]>
            : GetScalarType<T[P], Workout_instanceGroupByOutputType[P]>
        }
      >
    >


  export type workout_instanceSelect = {
    workout_schema_id?: boolean
    workout_schema?: boolean | workout_schemaArgs
    session_instance_id?: boolean
    session_instance?: boolean | session_instanceArgs
    sets_data?: boolean
  }

  export type workout_instanceInclude = {
    workout_schema?: boolean | workout_schemaArgs
    session_instance?: boolean | session_instanceArgs
  }

  export type workout_instanceGetPayload<
    S extends boolean | null | undefined | workout_instanceArgs,
    U = keyof S
      > = S extends true
        ? workout_instance
    : S extends undefined
    ? never
    : S extends workout_instanceArgs | workout_instanceFindManyArgs
    ?'include' extends U
    ? workout_instance  & {
    [P in TrueKeys<S['include']>]:
        P extends 'workout_schema' ? workout_schemaGetPayload<S['include'][P]> :
        P extends 'session_instance' ? session_instanceGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'workout_schema' ? workout_schemaGetPayload<S['select'][P]> :
        P extends 'session_instance' ? session_instanceGetPayload<S['select'][P]> :  P extends keyof workout_instance ? workout_instance[P] : never
  } 
    : workout_instance
  : workout_instance


  type workout_instanceCountArgs = Merge<
    Omit<workout_instanceFindManyArgs, 'select' | 'include'> & {
      select?: Workout_instanceCountAggregateInputType | true
    }
  >

  export interface workout_instanceDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Workout_instance that matches the filter.
     * @param {workout_instanceFindUniqueArgs} args - Arguments to find a Workout_instance
     * @example
     * // Get one Workout_instance
     * const workout_instance = await prisma.workout_instance.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends workout_instanceFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, workout_instanceFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'workout_instance'> extends True ? CheckSelect<T, Prisma__workout_instanceClient<workout_instance>, Prisma__workout_instanceClient<workout_instanceGetPayload<T>>> : CheckSelect<T, Prisma__workout_instanceClient<workout_instance | null >, Prisma__workout_instanceClient<workout_instanceGetPayload<T> | null >>

    /**
     * Find the first Workout_instance that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {workout_instanceFindFirstArgs} args - Arguments to find a Workout_instance
     * @example
     * // Get one Workout_instance
     * const workout_instance = await prisma.workout_instance.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends workout_instanceFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, workout_instanceFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'workout_instance'> extends True ? CheckSelect<T, Prisma__workout_instanceClient<workout_instance>, Prisma__workout_instanceClient<workout_instanceGetPayload<T>>> : CheckSelect<T, Prisma__workout_instanceClient<workout_instance | null >, Prisma__workout_instanceClient<workout_instanceGetPayload<T> | null >>

    /**
     * Find zero or more Workout_instances that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {workout_instanceFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Workout_instances
     * const workout_instances = await prisma.workout_instance.findMany()
     * 
     * // Get first 10 Workout_instances
     * const workout_instances = await prisma.workout_instance.findMany({ take: 10 })
     * 
     * // Only select the `workout_schema_id`
     * const workout_instanceWithWorkout_schema_idOnly = await prisma.workout_instance.findMany({ select: { workout_schema_id: true } })
     * 
    **/
    findMany<T extends workout_instanceFindManyArgs>(
      args?: SelectSubset<T, workout_instanceFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<workout_instance>>, PrismaPromise<Array<workout_instanceGetPayload<T>>>>

    /**
     * Create a Workout_instance.
     * @param {workout_instanceCreateArgs} args - Arguments to create a Workout_instance.
     * @example
     * // Create one Workout_instance
     * const Workout_instance = await prisma.workout_instance.create({
     *   data: {
     *     // ... data to create a Workout_instance
     *   }
     * })
     * 
    **/
    create<T extends workout_instanceCreateArgs>(
      args: SelectSubset<T, workout_instanceCreateArgs>
    ): CheckSelect<T, Prisma__workout_instanceClient<workout_instance>, Prisma__workout_instanceClient<workout_instanceGetPayload<T>>>

    /**
     * Create many Workout_instances.
     *     @param {workout_instanceCreateManyArgs} args - Arguments to create many Workout_instances.
     *     @example
     *     // Create many Workout_instances
     *     const workout_instance = await prisma.workout_instance.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends workout_instanceCreateManyArgs>(
      args?: SelectSubset<T, workout_instanceCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Workout_instance.
     * @param {workout_instanceDeleteArgs} args - Arguments to delete one Workout_instance.
     * @example
     * // Delete one Workout_instance
     * const Workout_instance = await prisma.workout_instance.delete({
     *   where: {
     *     // ... filter to delete one Workout_instance
     *   }
     * })
     * 
    **/
    delete<T extends workout_instanceDeleteArgs>(
      args: SelectSubset<T, workout_instanceDeleteArgs>
    ): CheckSelect<T, Prisma__workout_instanceClient<workout_instance>, Prisma__workout_instanceClient<workout_instanceGetPayload<T>>>

    /**
     * Update one Workout_instance.
     * @param {workout_instanceUpdateArgs} args - Arguments to update one Workout_instance.
     * @example
     * // Update one Workout_instance
     * const workout_instance = await prisma.workout_instance.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends workout_instanceUpdateArgs>(
      args: SelectSubset<T, workout_instanceUpdateArgs>
    ): CheckSelect<T, Prisma__workout_instanceClient<workout_instance>, Prisma__workout_instanceClient<workout_instanceGetPayload<T>>>

    /**
     * Delete zero or more Workout_instances.
     * @param {workout_instanceDeleteManyArgs} args - Arguments to filter Workout_instances to delete.
     * @example
     * // Delete a few Workout_instances
     * const { count } = await prisma.workout_instance.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends workout_instanceDeleteManyArgs>(
      args?: SelectSubset<T, workout_instanceDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Workout_instances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {workout_instanceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Workout_instances
     * const workout_instance = await prisma.workout_instance.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends workout_instanceUpdateManyArgs>(
      args: SelectSubset<T, workout_instanceUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Workout_instance.
     * @param {workout_instanceUpsertArgs} args - Arguments to update or create a Workout_instance.
     * @example
     * // Update or create a Workout_instance
     * const workout_instance = await prisma.workout_instance.upsert({
     *   create: {
     *     // ... data to create a Workout_instance
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Workout_instance we want to update
     *   }
     * })
    **/
    upsert<T extends workout_instanceUpsertArgs>(
      args: SelectSubset<T, workout_instanceUpsertArgs>
    ): CheckSelect<T, Prisma__workout_instanceClient<workout_instance>, Prisma__workout_instanceClient<workout_instanceGetPayload<T>>>

    /**
     * Count the number of Workout_instances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {workout_instanceCountArgs} args - Arguments to filter Workout_instances to count.
     * @example
     * // Count the number of Workout_instances
     * const count = await prisma.workout_instance.count({
     *   where: {
     *     // ... the filter for the Workout_instances we want to count
     *   }
     * })
    **/
    count<T extends workout_instanceCountArgs>(
      args?: Subset<T, workout_instanceCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Workout_instanceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Workout_instance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Workout_instanceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Workout_instanceAggregateArgs>(args: Subset<T, Workout_instanceAggregateArgs>): PrismaPromise<GetWorkout_instanceAggregateType<T>>

    /**
     * Group by Workout_instance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Workout_instanceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends Workout_instanceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Workout_instanceGroupByArgs['orderBy'] }
        : { orderBy?: Workout_instanceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, Workout_instanceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkout_instanceGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for workout_instance.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__workout_instanceClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    workout_schema<T extends workout_schemaArgs = {}>(args?: Subset<T, workout_schemaArgs>): CheckSelect<T, Prisma__workout_schemaClient<workout_schema | null >, Prisma__workout_schemaClient<workout_schemaGetPayload<T> | null >>;

    session_instance<T extends session_instanceArgs = {}>(args?: Subset<T, session_instanceArgs>): CheckSelect<T, Prisma__session_instanceClient<session_instance | null >, Prisma__session_instanceClient<session_instanceGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * workout_instance findUnique
   */
  export type workout_instanceFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the workout_instance
     * 
    **/
    select?: workout_instanceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: workout_instanceInclude | null
    /**
     * Throw an Error if a workout_instance can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which workout_instance to fetch.
     * 
    **/
    where: workout_instanceWhereUniqueInput
  }


  /**
   * workout_instance findFirst
   */
  export type workout_instanceFindFirstArgs = {
    /**
     * Select specific fields to fetch from the workout_instance
     * 
    **/
    select?: workout_instanceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: workout_instanceInclude | null
    /**
     * Throw an Error if a workout_instance can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which workout_instance to fetch.
     * 
    **/
    where?: workout_instanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of workout_instances to fetch.
     * 
    **/
    orderBy?: Enumerable<workout_instanceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for workout_instances.
     * 
    **/
    cursor?: workout_instanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` workout_instances from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` workout_instances.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of workout_instances.
     * 
    **/
    distinct?: Enumerable<Workout_instanceScalarFieldEnum>
  }


  /**
   * workout_instance findMany
   */
  export type workout_instanceFindManyArgs = {
    /**
     * Select specific fields to fetch from the workout_instance
     * 
    **/
    select?: workout_instanceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: workout_instanceInclude | null
    /**
     * Filter, which workout_instances to fetch.
     * 
    **/
    where?: workout_instanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of workout_instances to fetch.
     * 
    **/
    orderBy?: Enumerable<workout_instanceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing workout_instances.
     * 
    **/
    cursor?: workout_instanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` workout_instances from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` workout_instances.
     * 
    **/
    skip?: number
    distinct?: Enumerable<Workout_instanceScalarFieldEnum>
  }


  /**
   * workout_instance create
   */
  export type workout_instanceCreateArgs = {
    /**
     * Select specific fields to fetch from the workout_instance
     * 
    **/
    select?: workout_instanceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: workout_instanceInclude | null
    /**
     * The data needed to create a workout_instance.
     * 
    **/
    data: XOR<workout_instanceCreateInput, workout_instanceUncheckedCreateInput>
  }


  /**
   * workout_instance createMany
   */
  export type workout_instanceCreateManyArgs = {
    /**
     * The data used to create many workout_instances.
     * 
    **/
    data: Enumerable<workout_instanceCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * workout_instance update
   */
  export type workout_instanceUpdateArgs = {
    /**
     * Select specific fields to fetch from the workout_instance
     * 
    **/
    select?: workout_instanceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: workout_instanceInclude | null
    /**
     * The data needed to update a workout_instance.
     * 
    **/
    data: XOR<workout_instanceUpdateInput, workout_instanceUncheckedUpdateInput>
    /**
     * Choose, which workout_instance to update.
     * 
    **/
    where: workout_instanceWhereUniqueInput
  }


  /**
   * workout_instance updateMany
   */
  export type workout_instanceUpdateManyArgs = {
    /**
     * The data used to update workout_instances.
     * 
    **/
    data: XOR<workout_instanceUpdateManyMutationInput, workout_instanceUncheckedUpdateManyInput>
    /**
     * Filter which workout_instances to update
     * 
    **/
    where?: workout_instanceWhereInput
  }


  /**
   * workout_instance upsert
   */
  export type workout_instanceUpsertArgs = {
    /**
     * Select specific fields to fetch from the workout_instance
     * 
    **/
    select?: workout_instanceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: workout_instanceInclude | null
    /**
     * The filter to search for the workout_instance to update in case it exists.
     * 
    **/
    where: workout_instanceWhereUniqueInput
    /**
     * In case the workout_instance found by the `where` argument doesn't exist, create a new workout_instance with this data.
     * 
    **/
    create: XOR<workout_instanceCreateInput, workout_instanceUncheckedCreateInput>
    /**
     * In case the workout_instance was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<workout_instanceUpdateInput, workout_instanceUncheckedUpdateInput>
  }


  /**
   * workout_instance delete
   */
  export type workout_instanceDeleteArgs = {
    /**
     * Select specific fields to fetch from the workout_instance
     * 
    **/
    select?: workout_instanceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: workout_instanceInclude | null
    /**
     * Filter which workout_instance to delete.
     * 
    **/
    where: workout_instanceWhereUniqueInput
  }


  /**
   * workout_instance deleteMany
   */
  export type workout_instanceDeleteManyArgs = {
    /**
     * Filter which workout_instances to delete
     * 
    **/
    where?: workout_instanceWhereInput
  }


  /**
   * workout_instance without action
   */
  export type workout_instanceArgs = {
    /**
     * Select specific fields to fetch from the workout_instance
     * 
    **/
    select?: workout_instanceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: workout_instanceInclude | null
  }



  /**
   * Model superset_workout_instance
   */


  export type AggregateSuperset_workout_instance = {
    _count: Superset_workout_instanceCountAggregateOutputType | null
    _min: Superset_workout_instanceMinAggregateOutputType | null
    _max: Superset_workout_instanceMaxAggregateOutputType | null
  }

  export type Superset_workout_instanceMinAggregateOutputType = {
    superset_workout_schema_id: string | null
    session_instance_id: string | null
  }

  export type Superset_workout_instanceMaxAggregateOutputType = {
    superset_workout_schema_id: string | null
    session_instance_id: string | null
  }

  export type Superset_workout_instanceCountAggregateOutputType = {
    superset_workout_schema_id: number
    session_instance_id: number
    sets_data: number
    _all: number
  }


  export type Superset_workout_instanceMinAggregateInputType = {
    superset_workout_schema_id?: true
    session_instance_id?: true
  }

  export type Superset_workout_instanceMaxAggregateInputType = {
    superset_workout_schema_id?: true
    session_instance_id?: true
  }

  export type Superset_workout_instanceCountAggregateInputType = {
    superset_workout_schema_id?: true
    session_instance_id?: true
    sets_data?: true
    _all?: true
  }

  export type Superset_workout_instanceAggregateArgs = {
    /**
     * Filter which superset_workout_instance to aggregate.
     * 
    **/
    where?: superset_workout_instanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of superset_workout_instances to fetch.
     * 
    **/
    orderBy?: Enumerable<superset_workout_instanceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: superset_workout_instanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` superset_workout_instances from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` superset_workout_instances.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned superset_workout_instances
    **/
    _count?: true | Superset_workout_instanceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Superset_workout_instanceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Superset_workout_instanceMaxAggregateInputType
  }

  export type GetSuperset_workout_instanceAggregateType<T extends Superset_workout_instanceAggregateArgs> = {
        [P in keyof T & keyof AggregateSuperset_workout_instance]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSuperset_workout_instance[P]>
      : GetScalarType<T[P], AggregateSuperset_workout_instance[P]>
  }




  export type Superset_workout_instanceGroupByArgs = {
    where?: superset_workout_instanceWhereInput
    orderBy?: Enumerable<superset_workout_instanceOrderByWithAggregationInput>
    by: Array<Superset_workout_instanceScalarFieldEnum>
    having?: superset_workout_instanceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Superset_workout_instanceCountAggregateInputType | true
    _min?: Superset_workout_instanceMinAggregateInputType
    _max?: Superset_workout_instanceMaxAggregateInputType
  }


  export type Superset_workout_instanceGroupByOutputType = {
    superset_workout_schema_id: string
    session_instance_id: string
    sets_data: JsonValue
    _count: Superset_workout_instanceCountAggregateOutputType | null
    _min: Superset_workout_instanceMinAggregateOutputType | null
    _max: Superset_workout_instanceMaxAggregateOutputType | null
  }

  type GetSuperset_workout_instanceGroupByPayload<T extends Superset_workout_instanceGroupByArgs> = PrismaPromise<
    Array<
      PickArray<Superset_workout_instanceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Superset_workout_instanceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Superset_workout_instanceGroupByOutputType[P]>
            : GetScalarType<T[P], Superset_workout_instanceGroupByOutputType[P]>
        }
      >
    >


  export type superset_workout_instanceSelect = {
    superset_workout_schema_id?: boolean
    superset_workout_schema?: boolean | superset_workout_schemaArgs
    session_instance_id?: boolean
    session_instance?: boolean | session_instanceArgs
    sets_data?: boolean
  }

  export type superset_workout_instanceInclude = {
    superset_workout_schema?: boolean | superset_workout_schemaArgs
    session_instance?: boolean | session_instanceArgs
  }

  export type superset_workout_instanceGetPayload<
    S extends boolean | null | undefined | superset_workout_instanceArgs,
    U = keyof S
      > = S extends true
        ? superset_workout_instance
    : S extends undefined
    ? never
    : S extends superset_workout_instanceArgs | superset_workout_instanceFindManyArgs
    ?'include' extends U
    ? superset_workout_instance  & {
    [P in TrueKeys<S['include']>]:
        P extends 'superset_workout_schema' ? superset_workout_schemaGetPayload<S['include'][P]> :
        P extends 'session_instance' ? session_instanceGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'superset_workout_schema' ? superset_workout_schemaGetPayload<S['select'][P]> :
        P extends 'session_instance' ? session_instanceGetPayload<S['select'][P]> :  P extends keyof superset_workout_instance ? superset_workout_instance[P] : never
  } 
    : superset_workout_instance
  : superset_workout_instance


  type superset_workout_instanceCountArgs = Merge<
    Omit<superset_workout_instanceFindManyArgs, 'select' | 'include'> & {
      select?: Superset_workout_instanceCountAggregateInputType | true
    }
  >

  export interface superset_workout_instanceDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Superset_workout_instance that matches the filter.
     * @param {superset_workout_instanceFindUniqueArgs} args - Arguments to find a Superset_workout_instance
     * @example
     * // Get one Superset_workout_instance
     * const superset_workout_instance = await prisma.superset_workout_instance.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends superset_workout_instanceFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, superset_workout_instanceFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'superset_workout_instance'> extends True ? CheckSelect<T, Prisma__superset_workout_instanceClient<superset_workout_instance>, Prisma__superset_workout_instanceClient<superset_workout_instanceGetPayload<T>>> : CheckSelect<T, Prisma__superset_workout_instanceClient<superset_workout_instance | null >, Prisma__superset_workout_instanceClient<superset_workout_instanceGetPayload<T> | null >>

    /**
     * Find the first Superset_workout_instance that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {superset_workout_instanceFindFirstArgs} args - Arguments to find a Superset_workout_instance
     * @example
     * // Get one Superset_workout_instance
     * const superset_workout_instance = await prisma.superset_workout_instance.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends superset_workout_instanceFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, superset_workout_instanceFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'superset_workout_instance'> extends True ? CheckSelect<T, Prisma__superset_workout_instanceClient<superset_workout_instance>, Prisma__superset_workout_instanceClient<superset_workout_instanceGetPayload<T>>> : CheckSelect<T, Prisma__superset_workout_instanceClient<superset_workout_instance | null >, Prisma__superset_workout_instanceClient<superset_workout_instanceGetPayload<T> | null >>

    /**
     * Find zero or more Superset_workout_instances that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {superset_workout_instanceFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Superset_workout_instances
     * const superset_workout_instances = await prisma.superset_workout_instance.findMany()
     * 
     * // Get first 10 Superset_workout_instances
     * const superset_workout_instances = await prisma.superset_workout_instance.findMany({ take: 10 })
     * 
     * // Only select the `superset_workout_schema_id`
     * const superset_workout_instanceWithSuperset_workout_schema_idOnly = await prisma.superset_workout_instance.findMany({ select: { superset_workout_schema_id: true } })
     * 
    **/
    findMany<T extends superset_workout_instanceFindManyArgs>(
      args?: SelectSubset<T, superset_workout_instanceFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<superset_workout_instance>>, PrismaPromise<Array<superset_workout_instanceGetPayload<T>>>>

    /**
     * Create a Superset_workout_instance.
     * @param {superset_workout_instanceCreateArgs} args - Arguments to create a Superset_workout_instance.
     * @example
     * // Create one Superset_workout_instance
     * const Superset_workout_instance = await prisma.superset_workout_instance.create({
     *   data: {
     *     // ... data to create a Superset_workout_instance
     *   }
     * })
     * 
    **/
    create<T extends superset_workout_instanceCreateArgs>(
      args: SelectSubset<T, superset_workout_instanceCreateArgs>
    ): CheckSelect<T, Prisma__superset_workout_instanceClient<superset_workout_instance>, Prisma__superset_workout_instanceClient<superset_workout_instanceGetPayload<T>>>

    /**
     * Create many Superset_workout_instances.
     *     @param {superset_workout_instanceCreateManyArgs} args - Arguments to create many Superset_workout_instances.
     *     @example
     *     // Create many Superset_workout_instances
     *     const superset_workout_instance = await prisma.superset_workout_instance.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends superset_workout_instanceCreateManyArgs>(
      args?: SelectSubset<T, superset_workout_instanceCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Superset_workout_instance.
     * @param {superset_workout_instanceDeleteArgs} args - Arguments to delete one Superset_workout_instance.
     * @example
     * // Delete one Superset_workout_instance
     * const Superset_workout_instance = await prisma.superset_workout_instance.delete({
     *   where: {
     *     // ... filter to delete one Superset_workout_instance
     *   }
     * })
     * 
    **/
    delete<T extends superset_workout_instanceDeleteArgs>(
      args: SelectSubset<T, superset_workout_instanceDeleteArgs>
    ): CheckSelect<T, Prisma__superset_workout_instanceClient<superset_workout_instance>, Prisma__superset_workout_instanceClient<superset_workout_instanceGetPayload<T>>>

    /**
     * Update one Superset_workout_instance.
     * @param {superset_workout_instanceUpdateArgs} args - Arguments to update one Superset_workout_instance.
     * @example
     * // Update one Superset_workout_instance
     * const superset_workout_instance = await prisma.superset_workout_instance.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends superset_workout_instanceUpdateArgs>(
      args: SelectSubset<T, superset_workout_instanceUpdateArgs>
    ): CheckSelect<T, Prisma__superset_workout_instanceClient<superset_workout_instance>, Prisma__superset_workout_instanceClient<superset_workout_instanceGetPayload<T>>>

    /**
     * Delete zero or more Superset_workout_instances.
     * @param {superset_workout_instanceDeleteManyArgs} args - Arguments to filter Superset_workout_instances to delete.
     * @example
     * // Delete a few Superset_workout_instances
     * const { count } = await prisma.superset_workout_instance.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends superset_workout_instanceDeleteManyArgs>(
      args?: SelectSubset<T, superset_workout_instanceDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Superset_workout_instances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {superset_workout_instanceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Superset_workout_instances
     * const superset_workout_instance = await prisma.superset_workout_instance.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends superset_workout_instanceUpdateManyArgs>(
      args: SelectSubset<T, superset_workout_instanceUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Superset_workout_instance.
     * @param {superset_workout_instanceUpsertArgs} args - Arguments to update or create a Superset_workout_instance.
     * @example
     * // Update or create a Superset_workout_instance
     * const superset_workout_instance = await prisma.superset_workout_instance.upsert({
     *   create: {
     *     // ... data to create a Superset_workout_instance
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Superset_workout_instance we want to update
     *   }
     * })
    **/
    upsert<T extends superset_workout_instanceUpsertArgs>(
      args: SelectSubset<T, superset_workout_instanceUpsertArgs>
    ): CheckSelect<T, Prisma__superset_workout_instanceClient<superset_workout_instance>, Prisma__superset_workout_instanceClient<superset_workout_instanceGetPayload<T>>>

    /**
     * Count the number of Superset_workout_instances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {superset_workout_instanceCountArgs} args - Arguments to filter Superset_workout_instances to count.
     * @example
     * // Count the number of Superset_workout_instances
     * const count = await prisma.superset_workout_instance.count({
     *   where: {
     *     // ... the filter for the Superset_workout_instances we want to count
     *   }
     * })
    **/
    count<T extends superset_workout_instanceCountArgs>(
      args?: Subset<T, superset_workout_instanceCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Superset_workout_instanceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Superset_workout_instance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Superset_workout_instanceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Superset_workout_instanceAggregateArgs>(args: Subset<T, Superset_workout_instanceAggregateArgs>): PrismaPromise<GetSuperset_workout_instanceAggregateType<T>>

    /**
     * Group by Superset_workout_instance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Superset_workout_instanceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends Superset_workout_instanceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Superset_workout_instanceGroupByArgs['orderBy'] }
        : { orderBy?: Superset_workout_instanceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, Superset_workout_instanceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSuperset_workout_instanceGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for superset_workout_instance.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__superset_workout_instanceClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    superset_workout_schema<T extends superset_workout_schemaArgs = {}>(args?: Subset<T, superset_workout_schemaArgs>): CheckSelect<T, Prisma__superset_workout_schemaClient<superset_workout_schema | null >, Prisma__superset_workout_schemaClient<superset_workout_schemaGetPayload<T> | null >>;

    session_instance<T extends session_instanceArgs = {}>(args?: Subset<T, session_instanceArgs>): CheckSelect<T, Prisma__session_instanceClient<session_instance | null >, Prisma__session_instanceClient<session_instanceGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * superset_workout_instance findUnique
   */
  export type superset_workout_instanceFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the superset_workout_instance
     * 
    **/
    select?: superset_workout_instanceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: superset_workout_instanceInclude | null
    /**
     * Throw an Error if a superset_workout_instance can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which superset_workout_instance to fetch.
     * 
    **/
    where: superset_workout_instanceWhereUniqueInput
  }


  /**
   * superset_workout_instance findFirst
   */
  export type superset_workout_instanceFindFirstArgs = {
    /**
     * Select specific fields to fetch from the superset_workout_instance
     * 
    **/
    select?: superset_workout_instanceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: superset_workout_instanceInclude | null
    /**
     * Throw an Error if a superset_workout_instance can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which superset_workout_instance to fetch.
     * 
    **/
    where?: superset_workout_instanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of superset_workout_instances to fetch.
     * 
    **/
    orderBy?: Enumerable<superset_workout_instanceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for superset_workout_instances.
     * 
    **/
    cursor?: superset_workout_instanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` superset_workout_instances from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` superset_workout_instances.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of superset_workout_instances.
     * 
    **/
    distinct?: Enumerable<Superset_workout_instanceScalarFieldEnum>
  }


  /**
   * superset_workout_instance findMany
   */
  export type superset_workout_instanceFindManyArgs = {
    /**
     * Select specific fields to fetch from the superset_workout_instance
     * 
    **/
    select?: superset_workout_instanceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: superset_workout_instanceInclude | null
    /**
     * Filter, which superset_workout_instances to fetch.
     * 
    **/
    where?: superset_workout_instanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of superset_workout_instances to fetch.
     * 
    **/
    orderBy?: Enumerable<superset_workout_instanceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing superset_workout_instances.
     * 
    **/
    cursor?: superset_workout_instanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` superset_workout_instances from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` superset_workout_instances.
     * 
    **/
    skip?: number
    distinct?: Enumerable<Superset_workout_instanceScalarFieldEnum>
  }


  /**
   * superset_workout_instance create
   */
  export type superset_workout_instanceCreateArgs = {
    /**
     * Select specific fields to fetch from the superset_workout_instance
     * 
    **/
    select?: superset_workout_instanceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: superset_workout_instanceInclude | null
    /**
     * The data needed to create a superset_workout_instance.
     * 
    **/
    data: XOR<superset_workout_instanceCreateInput, superset_workout_instanceUncheckedCreateInput>
  }


  /**
   * superset_workout_instance createMany
   */
  export type superset_workout_instanceCreateManyArgs = {
    /**
     * The data used to create many superset_workout_instances.
     * 
    **/
    data: Enumerable<superset_workout_instanceCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * superset_workout_instance update
   */
  export type superset_workout_instanceUpdateArgs = {
    /**
     * Select specific fields to fetch from the superset_workout_instance
     * 
    **/
    select?: superset_workout_instanceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: superset_workout_instanceInclude | null
    /**
     * The data needed to update a superset_workout_instance.
     * 
    **/
    data: XOR<superset_workout_instanceUpdateInput, superset_workout_instanceUncheckedUpdateInput>
    /**
     * Choose, which superset_workout_instance to update.
     * 
    **/
    where: superset_workout_instanceWhereUniqueInput
  }


  /**
   * superset_workout_instance updateMany
   */
  export type superset_workout_instanceUpdateManyArgs = {
    /**
     * The data used to update superset_workout_instances.
     * 
    **/
    data: XOR<superset_workout_instanceUpdateManyMutationInput, superset_workout_instanceUncheckedUpdateManyInput>
    /**
     * Filter which superset_workout_instances to update
     * 
    **/
    where?: superset_workout_instanceWhereInput
  }


  /**
   * superset_workout_instance upsert
   */
  export type superset_workout_instanceUpsertArgs = {
    /**
     * Select specific fields to fetch from the superset_workout_instance
     * 
    **/
    select?: superset_workout_instanceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: superset_workout_instanceInclude | null
    /**
     * The filter to search for the superset_workout_instance to update in case it exists.
     * 
    **/
    where: superset_workout_instanceWhereUniqueInput
    /**
     * In case the superset_workout_instance found by the `where` argument doesn't exist, create a new superset_workout_instance with this data.
     * 
    **/
    create: XOR<superset_workout_instanceCreateInput, superset_workout_instanceUncheckedCreateInput>
    /**
     * In case the superset_workout_instance was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<superset_workout_instanceUpdateInput, superset_workout_instanceUncheckedUpdateInput>
  }


  /**
   * superset_workout_instance delete
   */
  export type superset_workout_instanceDeleteArgs = {
    /**
     * Select specific fields to fetch from the superset_workout_instance
     * 
    **/
    select?: superset_workout_instanceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: superset_workout_instanceInclude | null
    /**
     * Filter which superset_workout_instance to delete.
     * 
    **/
    where: superset_workout_instanceWhereUniqueInput
  }


  /**
   * superset_workout_instance deleteMany
   */
  export type superset_workout_instanceDeleteManyArgs = {
    /**
     * Filter which superset_workout_instances to delete
     * 
    **/
    where?: superset_workout_instanceWhereInput
  }


  /**
   * superset_workout_instance without action
   */
  export type superset_workout_instanceArgs = {
    /**
     * Select specific fields to fetch from the superset_workout_instance
     * 
    **/
    select?: superset_workout_instanceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: superset_workout_instanceInclude | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const UserScalarFieldEnum: {
    id: 'id',
    first_name: 'first_name',
    last_name: 'last_name',
    email: 'email',
    hashed_password: 'hashed_password',
    is_banned: 'is_banned',
    created_time: 'created_time',
    last_token_generated_at: 'last_token_generated_at'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const WorkoutScalarFieldEnum: {
    id: 'id',
    name: 'name',
    category: 'category',
    target_body_part: 'target_body_part',
    intensity: 'intensity',
    owner_id: 'owner_id',
    is_public: 'is_public'
  };

  export type WorkoutScalarFieldEnum = (typeof WorkoutScalarFieldEnum)[keyof typeof WorkoutScalarFieldEnum]


  export const Session_schemaScalarFieldEnum: {
    id: 'id',
    name: 'name',
    owner_id: 'owner_id'
  };

  export type Session_schemaScalarFieldEnum = (typeof Session_schemaScalarFieldEnum)[keyof typeof Session_schemaScalarFieldEnum]


  export const Workout_schemaScalarFieldEnum: {
    id: 'id',
    session_schema_id: 'session_schema_id',
    workout_id: 'workout_id',
    default_target: 'default_target',
    order: 'order'
  };

  export type Workout_schemaScalarFieldEnum = (typeof Workout_schemaScalarFieldEnum)[keyof typeof Workout_schemaScalarFieldEnum]


  export const Superset_schemaScalarFieldEnum: {
    id: 'id',
    name: 'name',
    session_schema_id: 'session_schema_id'
  };

  export type Superset_schemaScalarFieldEnum = (typeof Superset_schemaScalarFieldEnum)[keyof typeof Superset_schemaScalarFieldEnum]


  export const Superset_workout_schemaScalarFieldEnum: {
    id: 'id',
    superset_schema_id: 'superset_schema_id',
    workout_id: 'workout_id',
    default_target: 'default_target',
    order: 'order'
  };

  export type Superset_workout_schemaScalarFieldEnum = (typeof Superset_workout_schemaScalarFieldEnum)[keyof typeof Superset_workout_schemaScalarFieldEnum]


  export const Session_instanceScalarFieldEnum: {
    id: 'id',
    session_schema_id: 'session_schema_id',
    start_timestamp: 'start_timestamp',
    end_timestamp: 'end_timestamp'
  };

  export type Session_instanceScalarFieldEnum = (typeof Session_instanceScalarFieldEnum)[keyof typeof Session_instanceScalarFieldEnum]


  export const Workout_instanceScalarFieldEnum: {
    workout_schema_id: 'workout_schema_id',
    session_instance_id: 'session_instance_id',
    sets_data: 'sets_data'
  };

  export type Workout_instanceScalarFieldEnum = (typeof Workout_instanceScalarFieldEnum)[keyof typeof Workout_instanceScalarFieldEnum]


  export const Superset_workout_instanceScalarFieldEnum: {
    superset_workout_schema_id: 'superset_workout_schema_id',
    session_instance_id: 'session_instance_id',
    sets_data: 'sets_data'
  };

  export type Superset_workout_instanceScalarFieldEnum = (typeof Superset_workout_instanceScalarFieldEnum)[keyof typeof Superset_workout_instanceScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: 'JsonNull'
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: 'DbNull',
    JsonNull: 'JsonNull',
    AnyNull: 'AnyNull'
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Deep Input Types
   */


  export type userWhereInput = {
    AND?: Enumerable<userWhereInput>
    OR?: Enumerable<userWhereInput>
    NOT?: Enumerable<userWhereInput>
    id?: StringFilter | string
    first_name?: StringFilter | string
    last_name?: StringFilter | string
    email?: StringFilter | string
    hashed_password?: StringFilter | string
    is_banned?: BoolFilter | boolean
    created_time?: DateTimeFilter | Date | string
    last_token_generated_at?: DateTimeFilter | Date | string
    workout?: WorkoutListRelationFilter
    session_schema?: Session_schemaListRelationFilter
  }

  export type userOrderByWithRelationInput = {
    id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    email?: SortOrder
    hashed_password?: SortOrder
    is_banned?: SortOrder
    created_time?: SortOrder
    last_token_generated_at?: SortOrder
    workout?: workoutOrderByRelationAggregateInput
    session_schema?: session_schemaOrderByRelationAggregateInput
  }

  export type userWhereUniqueInput = {
    id?: string
    email?: string
  }

  export type userOrderByWithAggregationInput = {
    id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    email?: SortOrder
    hashed_password?: SortOrder
    is_banned?: SortOrder
    created_time?: SortOrder
    last_token_generated_at?: SortOrder
    _count?: userCountOrderByAggregateInput
    _max?: userMaxOrderByAggregateInput
    _min?: userMinOrderByAggregateInput
  }

  export type userScalarWhereWithAggregatesInput = {
    AND?: Enumerable<userScalarWhereWithAggregatesInput>
    OR?: Enumerable<userScalarWhereWithAggregatesInput>
    NOT?: Enumerable<userScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    first_name?: StringWithAggregatesFilter | string
    last_name?: StringWithAggregatesFilter | string
    email?: StringWithAggregatesFilter | string
    hashed_password?: StringWithAggregatesFilter | string
    is_banned?: BoolWithAggregatesFilter | boolean
    created_time?: DateTimeWithAggregatesFilter | Date | string
    last_token_generated_at?: DateTimeWithAggregatesFilter | Date | string
  }

  export type workoutWhereInput = {
    AND?: Enumerable<workoutWhereInput>
    OR?: Enumerable<workoutWhereInput>
    NOT?: Enumerable<workoutWhereInput>
    id?: StringFilter | string
    name?: StringFilter | string
    category?: Enumworkout_typeFilter | workout_type
    target_body_part?: Enumbody_partNullableFilter | body_part | null
    intensity?: Enumintensity_levelsNullableFilter | intensity_levels | null
    owner_id?: StringFilter | string
    owner?: XOR<UserRelationFilter, userWhereInput>
    is_public?: BoolFilter | boolean
    workout_schema?: Workout_schemaListRelationFilter
    superset_workout_schema?: Superset_workout_schemaListRelationFilter
  }

  export type workoutOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    target_body_part?: SortOrder
    intensity?: SortOrder
    owner_id?: SortOrder
    owner?: userOrderByWithRelationInput
    is_public?: SortOrder
    workout_schema?: workout_schemaOrderByRelationAggregateInput
    superset_workout_schema?: superset_workout_schemaOrderByRelationAggregateInput
  }

  export type workoutWhereUniqueInput = {
    id?: string
  }

  export type workoutOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    target_body_part?: SortOrder
    intensity?: SortOrder
    owner_id?: SortOrder
    is_public?: SortOrder
    _count?: workoutCountOrderByAggregateInput
    _max?: workoutMaxOrderByAggregateInput
    _min?: workoutMinOrderByAggregateInput
  }

  export type workoutScalarWhereWithAggregatesInput = {
    AND?: Enumerable<workoutScalarWhereWithAggregatesInput>
    OR?: Enumerable<workoutScalarWhereWithAggregatesInput>
    NOT?: Enumerable<workoutScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    name?: StringWithAggregatesFilter | string
    category?: Enumworkout_typeWithAggregatesFilter | workout_type
    target_body_part?: Enumbody_partNullableWithAggregatesFilter | body_part | null
    intensity?: Enumintensity_levelsNullableWithAggregatesFilter | intensity_levels | null
    owner_id?: StringWithAggregatesFilter | string
    is_public?: BoolWithAggregatesFilter | boolean
  }

  export type session_schemaWhereInput = {
    AND?: Enumerable<session_schemaWhereInput>
    OR?: Enumerable<session_schemaWhereInput>
    NOT?: Enumerable<session_schemaWhereInput>
    id?: StringFilter | string
    name?: StringFilter | string
    owner_id?: StringFilter | string
    owner?: XOR<UserRelationFilter, userWhereInput>
    workout_schema?: Workout_schemaListRelationFilter
    superset_schema?: Superset_schemaListRelationFilter
    session_instance?: Session_instanceListRelationFilter
  }

  export type session_schemaOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    owner_id?: SortOrder
    owner?: userOrderByWithRelationInput
    workout_schema?: workout_schemaOrderByRelationAggregateInput
    superset_schema?: superset_schemaOrderByRelationAggregateInput
    session_instance?: session_instanceOrderByRelationAggregateInput
  }

  export type session_schemaWhereUniqueInput = {
    id?: string
  }

  export type session_schemaOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    owner_id?: SortOrder
    _count?: session_schemaCountOrderByAggregateInput
    _max?: session_schemaMaxOrderByAggregateInput
    _min?: session_schemaMinOrderByAggregateInput
  }

  export type session_schemaScalarWhereWithAggregatesInput = {
    AND?: Enumerable<session_schemaScalarWhereWithAggregatesInput>
    OR?: Enumerable<session_schemaScalarWhereWithAggregatesInput>
    NOT?: Enumerable<session_schemaScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    name?: StringWithAggregatesFilter | string
    owner_id?: StringWithAggregatesFilter | string
  }

  export type workout_schemaWhereInput = {
    AND?: Enumerable<workout_schemaWhereInput>
    OR?: Enumerable<workout_schemaWhereInput>
    NOT?: Enumerable<workout_schemaWhereInput>
    id?: StringFilter | string
    session_schema_id?: StringFilter | string
    session_schema?: XOR<Session_schemaRelationFilter, session_schemaWhereInput>
    workout_id?: StringFilter | string
    workout?: XOR<WorkoutRelationFilter, workoutWhereInput>
    default_target?: JsonFilter
    order?: IntFilter | number
    workout_instance?: Workout_instanceListRelationFilter
  }

  export type workout_schemaOrderByWithRelationInput = {
    id?: SortOrder
    session_schema_id?: SortOrder
    session_schema?: session_schemaOrderByWithRelationInput
    workout_id?: SortOrder
    workout?: workoutOrderByWithRelationInput
    default_target?: SortOrder
    order?: SortOrder
    workout_instance?: workout_instanceOrderByRelationAggregateInput
  }

  export type workout_schemaWhereUniqueInput = {
    id?: string
  }

  export type workout_schemaOrderByWithAggregationInput = {
    id?: SortOrder
    session_schema_id?: SortOrder
    workout_id?: SortOrder
    default_target?: SortOrder
    order?: SortOrder
    _count?: workout_schemaCountOrderByAggregateInput
    _avg?: workout_schemaAvgOrderByAggregateInput
    _max?: workout_schemaMaxOrderByAggregateInput
    _min?: workout_schemaMinOrderByAggregateInput
    _sum?: workout_schemaSumOrderByAggregateInput
  }

  export type workout_schemaScalarWhereWithAggregatesInput = {
    AND?: Enumerable<workout_schemaScalarWhereWithAggregatesInput>
    OR?: Enumerable<workout_schemaScalarWhereWithAggregatesInput>
    NOT?: Enumerable<workout_schemaScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    session_schema_id?: StringWithAggregatesFilter | string
    workout_id?: StringWithAggregatesFilter | string
    default_target?: JsonWithAggregatesFilter
    order?: IntWithAggregatesFilter | number
  }

  export type superset_schemaWhereInput = {
    AND?: Enumerable<superset_schemaWhereInput>
    OR?: Enumerable<superset_schemaWhereInput>
    NOT?: Enumerable<superset_schemaWhereInput>
    id?: StringFilter | string
    name?: StringFilter | string
    session_schema_id?: StringFilter | string
    session_schema?: XOR<Session_schemaRelationFilter, session_schemaWhereInput>
    superset_workout_schema?: Superset_workout_schemaListRelationFilter
  }

  export type superset_schemaOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    session_schema_id?: SortOrder
    session_schema?: session_schemaOrderByWithRelationInput
    superset_workout_schema?: superset_workout_schemaOrderByRelationAggregateInput
  }

  export type superset_schemaWhereUniqueInput = {
    id?: string
  }

  export type superset_schemaOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    session_schema_id?: SortOrder
    _count?: superset_schemaCountOrderByAggregateInput
    _max?: superset_schemaMaxOrderByAggregateInput
    _min?: superset_schemaMinOrderByAggregateInput
  }

  export type superset_schemaScalarWhereWithAggregatesInput = {
    AND?: Enumerable<superset_schemaScalarWhereWithAggregatesInput>
    OR?: Enumerable<superset_schemaScalarWhereWithAggregatesInput>
    NOT?: Enumerable<superset_schemaScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    name?: StringWithAggregatesFilter | string
    session_schema_id?: StringWithAggregatesFilter | string
  }

  export type superset_workout_schemaWhereInput = {
    AND?: Enumerable<superset_workout_schemaWhereInput>
    OR?: Enumerable<superset_workout_schemaWhereInput>
    NOT?: Enumerable<superset_workout_schemaWhereInput>
    id?: StringFilter | string
    superset_schema_id?: StringFilter | string
    superset_schema?: XOR<Superset_schemaRelationFilter, superset_schemaWhereInput>
    workout_id?: StringFilter | string
    workout?: XOR<WorkoutRelationFilter, workoutWhereInput>
    default_target?: JsonFilter
    order?: IntFilter | number
    superset_workout_instance?: Superset_workout_instanceListRelationFilter
  }

  export type superset_workout_schemaOrderByWithRelationInput = {
    id?: SortOrder
    superset_schema_id?: SortOrder
    superset_schema?: superset_schemaOrderByWithRelationInput
    workout_id?: SortOrder
    workout?: workoutOrderByWithRelationInput
    default_target?: SortOrder
    order?: SortOrder
    superset_workout_instance?: superset_workout_instanceOrderByRelationAggregateInput
  }

  export type superset_workout_schemaWhereUniqueInput = {
    id?: string
  }

  export type superset_workout_schemaOrderByWithAggregationInput = {
    id?: SortOrder
    superset_schema_id?: SortOrder
    workout_id?: SortOrder
    default_target?: SortOrder
    order?: SortOrder
    _count?: superset_workout_schemaCountOrderByAggregateInput
    _avg?: superset_workout_schemaAvgOrderByAggregateInput
    _max?: superset_workout_schemaMaxOrderByAggregateInput
    _min?: superset_workout_schemaMinOrderByAggregateInput
    _sum?: superset_workout_schemaSumOrderByAggregateInput
  }

  export type superset_workout_schemaScalarWhereWithAggregatesInput = {
    AND?: Enumerable<superset_workout_schemaScalarWhereWithAggregatesInput>
    OR?: Enumerable<superset_workout_schemaScalarWhereWithAggregatesInput>
    NOT?: Enumerable<superset_workout_schemaScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    superset_schema_id?: StringWithAggregatesFilter | string
    workout_id?: StringWithAggregatesFilter | string
    default_target?: JsonWithAggregatesFilter
    order?: IntWithAggregatesFilter | number
  }

  export type session_instanceWhereInput = {
    AND?: Enumerable<session_instanceWhereInput>
    OR?: Enumerable<session_instanceWhereInput>
    NOT?: Enumerable<session_instanceWhereInput>
    id?: StringFilter | string
    session_schema_id?: StringFilter | string
    session_schema?: XOR<Session_schemaRelationFilter, session_schemaWhereInput>
    start_timestamp?: DateTimeFilter | Date | string
    end_timestamp?: DateTimeNullableFilter | Date | string | null
    workout_instance?: Workout_instanceListRelationFilter
    superset_workout_instance?: Superset_workout_instanceListRelationFilter
  }

  export type session_instanceOrderByWithRelationInput = {
    id?: SortOrder
    session_schema_id?: SortOrder
    session_schema?: session_schemaOrderByWithRelationInput
    start_timestamp?: SortOrder
    end_timestamp?: SortOrder
    workout_instance?: workout_instanceOrderByRelationAggregateInput
    superset_workout_instance?: superset_workout_instanceOrderByRelationAggregateInput
  }

  export type session_instanceWhereUniqueInput = {
    id?: string
  }

  export type session_instanceOrderByWithAggregationInput = {
    id?: SortOrder
    session_schema_id?: SortOrder
    start_timestamp?: SortOrder
    end_timestamp?: SortOrder
    _count?: session_instanceCountOrderByAggregateInput
    _max?: session_instanceMaxOrderByAggregateInput
    _min?: session_instanceMinOrderByAggregateInput
  }

  export type session_instanceScalarWhereWithAggregatesInput = {
    AND?: Enumerable<session_instanceScalarWhereWithAggregatesInput>
    OR?: Enumerable<session_instanceScalarWhereWithAggregatesInput>
    NOT?: Enumerable<session_instanceScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    session_schema_id?: StringWithAggregatesFilter | string
    start_timestamp?: DateTimeWithAggregatesFilter | Date | string
    end_timestamp?: DateTimeNullableWithAggregatesFilter | Date | string | null
  }

  export type workout_instanceWhereInput = {
    AND?: Enumerable<workout_instanceWhereInput>
    OR?: Enumerable<workout_instanceWhereInput>
    NOT?: Enumerable<workout_instanceWhereInput>
    workout_schema_id?: StringFilter | string
    workout_schema?: XOR<Workout_schemaRelationFilter, workout_schemaWhereInput>
    session_instance_id?: StringFilter | string
    session_instance?: XOR<Session_instanceRelationFilter, session_instanceWhereInput>
    sets_data?: JsonFilter
  }

  export type workout_instanceOrderByWithRelationInput = {
    workout_schema_id?: SortOrder
    workout_schema?: workout_schemaOrderByWithRelationInput
    session_instance_id?: SortOrder
    session_instance?: session_instanceOrderByWithRelationInput
    sets_data?: SortOrder
  }

  export type workout_instanceWhereUniqueInput = {
    session_instance_id_workout_schema_id?: workout_instanceSession_instance_idWorkout_schema_idCompoundUniqueInput
  }

  export type workout_instanceOrderByWithAggregationInput = {
    workout_schema_id?: SortOrder
    session_instance_id?: SortOrder
    sets_data?: SortOrder
    _count?: workout_instanceCountOrderByAggregateInput
    _max?: workout_instanceMaxOrderByAggregateInput
    _min?: workout_instanceMinOrderByAggregateInput
  }

  export type workout_instanceScalarWhereWithAggregatesInput = {
    AND?: Enumerable<workout_instanceScalarWhereWithAggregatesInput>
    OR?: Enumerable<workout_instanceScalarWhereWithAggregatesInput>
    NOT?: Enumerable<workout_instanceScalarWhereWithAggregatesInput>
    workout_schema_id?: StringWithAggregatesFilter | string
    session_instance_id?: StringWithAggregatesFilter | string
    sets_data?: JsonWithAggregatesFilter
  }

  export type superset_workout_instanceWhereInput = {
    AND?: Enumerable<superset_workout_instanceWhereInput>
    OR?: Enumerable<superset_workout_instanceWhereInput>
    NOT?: Enumerable<superset_workout_instanceWhereInput>
    superset_workout_schema_id?: StringFilter | string
    superset_workout_schema?: XOR<Superset_workout_schemaRelationFilter, superset_workout_schemaWhereInput>
    session_instance_id?: StringFilter | string
    session_instance?: XOR<Session_instanceRelationFilter, session_instanceWhereInput>
    sets_data?: JsonFilter
  }

  export type superset_workout_instanceOrderByWithRelationInput = {
    superset_workout_schema_id?: SortOrder
    superset_workout_schema?: superset_workout_schemaOrderByWithRelationInput
    session_instance_id?: SortOrder
    session_instance?: session_instanceOrderByWithRelationInput
    sets_data?: SortOrder
  }

  export type superset_workout_instanceWhereUniqueInput = {
    session_instance_id_superset_workout_schema_id?: superset_workout_instanceSession_instance_idSuperset_workout_schema_idCompoundUniqueInput
  }

  export type superset_workout_instanceOrderByWithAggregationInput = {
    superset_workout_schema_id?: SortOrder
    session_instance_id?: SortOrder
    sets_data?: SortOrder
    _count?: superset_workout_instanceCountOrderByAggregateInput
    _max?: superset_workout_instanceMaxOrderByAggregateInput
    _min?: superset_workout_instanceMinOrderByAggregateInput
  }

  export type superset_workout_instanceScalarWhereWithAggregatesInput = {
    AND?: Enumerable<superset_workout_instanceScalarWhereWithAggregatesInput>
    OR?: Enumerable<superset_workout_instanceScalarWhereWithAggregatesInput>
    NOT?: Enumerable<superset_workout_instanceScalarWhereWithAggregatesInput>
    superset_workout_schema_id?: StringWithAggregatesFilter | string
    session_instance_id?: StringWithAggregatesFilter | string
    sets_data?: JsonWithAggregatesFilter
  }

  export type userCreateInput = {
    id: string
    first_name: string
    last_name: string
    email: string
    hashed_password: string
    is_banned?: boolean
    created_time?: Date | string
    last_token_generated_at?: Date | string
    workout?: workoutCreateNestedManyWithoutOwnerInput
    session_schema?: session_schemaCreateNestedManyWithoutOwnerInput
  }

  export type userUncheckedCreateInput = {
    id: string
    first_name: string
    last_name: string
    email: string
    hashed_password: string
    is_banned?: boolean
    created_time?: Date | string
    last_token_generated_at?: Date | string
    workout?: workoutUncheckedCreateNestedManyWithoutOwnerInput
    session_schema?: session_schemaUncheckedCreateNestedManyWithoutOwnerInput
  }

  export type userUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashed_password?: StringFieldUpdateOperationsInput | string
    is_banned?: BoolFieldUpdateOperationsInput | boolean
    created_time?: DateTimeFieldUpdateOperationsInput | Date | string
    last_token_generated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    workout?: workoutUpdateManyWithoutOwnerInput
    session_schema?: session_schemaUpdateManyWithoutOwnerInput
  }

  export type userUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashed_password?: StringFieldUpdateOperationsInput | string
    is_banned?: BoolFieldUpdateOperationsInput | boolean
    created_time?: DateTimeFieldUpdateOperationsInput | Date | string
    last_token_generated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    workout?: workoutUncheckedUpdateManyWithoutOwnerInput
    session_schema?: session_schemaUncheckedUpdateManyWithoutOwnerInput
  }

  export type userCreateManyInput = {
    id: string
    first_name: string
    last_name: string
    email: string
    hashed_password: string
    is_banned?: boolean
    created_time?: Date | string
    last_token_generated_at?: Date | string
  }

  export type userUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashed_password?: StringFieldUpdateOperationsInput | string
    is_banned?: BoolFieldUpdateOperationsInput | boolean
    created_time?: DateTimeFieldUpdateOperationsInput | Date | string
    last_token_generated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type userUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashed_password?: StringFieldUpdateOperationsInput | string
    is_banned?: BoolFieldUpdateOperationsInput | boolean
    created_time?: DateTimeFieldUpdateOperationsInput | Date | string
    last_token_generated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type workoutCreateInput = {
    id: string
    name: string
    category: workout_type
    target_body_part?: body_part | null
    intensity?: intensity_levels | null
    owner: userCreateNestedOneWithoutWorkoutInput
    is_public?: boolean
    workout_schema?: workout_schemaCreateNestedManyWithoutWorkoutInput
    superset_workout_schema?: superset_workout_schemaCreateNestedManyWithoutWorkoutInput
  }

  export type workoutUncheckedCreateInput = {
    id: string
    name: string
    category: workout_type
    target_body_part?: body_part | null
    intensity?: intensity_levels | null
    owner_id: string
    is_public?: boolean
    workout_schema?: workout_schemaUncheckedCreateNestedManyWithoutWorkoutInput
    superset_workout_schema?: superset_workout_schemaUncheckedCreateNestedManyWithoutWorkoutInput
  }

  export type workoutUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: Enumworkout_typeFieldUpdateOperationsInput | workout_type
    target_body_part?: NullableEnumbody_partFieldUpdateOperationsInput | body_part | null
    intensity?: NullableEnumintensity_levelsFieldUpdateOperationsInput | intensity_levels | null
    owner?: userUpdateOneRequiredWithoutWorkoutInput
    is_public?: BoolFieldUpdateOperationsInput | boolean
    workout_schema?: workout_schemaUpdateManyWithoutWorkoutInput
    superset_workout_schema?: superset_workout_schemaUpdateManyWithoutWorkoutInput
  }

  export type workoutUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: Enumworkout_typeFieldUpdateOperationsInput | workout_type
    target_body_part?: NullableEnumbody_partFieldUpdateOperationsInput | body_part | null
    intensity?: NullableEnumintensity_levelsFieldUpdateOperationsInput | intensity_levels | null
    owner_id?: StringFieldUpdateOperationsInput | string
    is_public?: BoolFieldUpdateOperationsInput | boolean
    workout_schema?: workout_schemaUncheckedUpdateManyWithoutWorkoutInput
    superset_workout_schema?: superset_workout_schemaUncheckedUpdateManyWithoutWorkoutInput
  }

  export type workoutCreateManyInput = {
    id: string
    name: string
    category: workout_type
    target_body_part?: body_part | null
    intensity?: intensity_levels | null
    owner_id: string
    is_public?: boolean
  }

  export type workoutUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: Enumworkout_typeFieldUpdateOperationsInput | workout_type
    target_body_part?: NullableEnumbody_partFieldUpdateOperationsInput | body_part | null
    intensity?: NullableEnumintensity_levelsFieldUpdateOperationsInput | intensity_levels | null
    is_public?: BoolFieldUpdateOperationsInput | boolean
  }

  export type workoutUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: Enumworkout_typeFieldUpdateOperationsInput | workout_type
    target_body_part?: NullableEnumbody_partFieldUpdateOperationsInput | body_part | null
    intensity?: NullableEnumintensity_levelsFieldUpdateOperationsInput | intensity_levels | null
    owner_id?: StringFieldUpdateOperationsInput | string
    is_public?: BoolFieldUpdateOperationsInput | boolean
  }

  export type session_schemaCreateInput = {
    id: string
    name: string
    owner: userCreateNestedOneWithoutSession_schemaInput
    workout_schema?: workout_schemaCreateNestedManyWithoutSession_schemaInput
    superset_schema?: superset_schemaCreateNestedManyWithoutSession_schemaInput
    session_instance?: session_instanceCreateNestedManyWithoutSession_schemaInput
  }

  export type session_schemaUncheckedCreateInput = {
    id: string
    name: string
    owner_id: string
    workout_schema?: workout_schemaUncheckedCreateNestedManyWithoutSession_schemaInput
    superset_schema?: superset_schemaUncheckedCreateNestedManyWithoutSession_schemaInput
    session_instance?: session_instanceUncheckedCreateNestedManyWithoutSession_schemaInput
  }

  export type session_schemaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    owner?: userUpdateOneRequiredWithoutSession_schemaInput
    workout_schema?: workout_schemaUpdateManyWithoutSession_schemaInput
    superset_schema?: superset_schemaUpdateManyWithoutSession_schemaInput
    session_instance?: session_instanceUpdateManyWithoutSession_schemaInput
  }

  export type session_schemaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    owner_id?: StringFieldUpdateOperationsInput | string
    workout_schema?: workout_schemaUncheckedUpdateManyWithoutSession_schemaInput
    superset_schema?: superset_schemaUncheckedUpdateManyWithoutSession_schemaInput
    session_instance?: session_instanceUncheckedUpdateManyWithoutSession_schemaInput
  }

  export type session_schemaCreateManyInput = {
    id: string
    name: string
    owner_id: string
  }

  export type session_schemaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type session_schemaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    owner_id?: StringFieldUpdateOperationsInput | string
  }

  export type workout_schemaCreateInput = {
    id: string
    session_schema: session_schemaCreateNestedOneWithoutWorkout_schemaInput
    workout: workoutCreateNestedOneWithoutWorkout_schemaInput
    default_target: JsonNullValueInput | InputJsonValue
    order?: number
    workout_instance?: workout_instanceCreateNestedManyWithoutWorkout_schemaInput
  }

  export type workout_schemaUncheckedCreateInput = {
    id: string
    session_schema_id: string
    workout_id: string
    default_target: JsonNullValueInput | InputJsonValue
    order?: number
    workout_instance?: workout_instanceUncheckedCreateNestedManyWithoutWorkout_schemaInput
  }

  export type workout_schemaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    session_schema?: session_schemaUpdateOneRequiredWithoutWorkout_schemaInput
    workout?: workoutUpdateOneRequiredWithoutWorkout_schemaInput
    default_target?: JsonNullValueInput | InputJsonValue
    order?: IntFieldUpdateOperationsInput | number
    workout_instance?: workout_instanceUpdateManyWithoutWorkout_schemaInput
  }

  export type workout_schemaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    session_schema_id?: StringFieldUpdateOperationsInput | string
    workout_id?: StringFieldUpdateOperationsInput | string
    default_target?: JsonNullValueInput | InputJsonValue
    order?: IntFieldUpdateOperationsInput | number
    workout_instance?: workout_instanceUncheckedUpdateManyWithoutWorkout_schemaInput
  }

  export type workout_schemaCreateManyInput = {
    id: string
    session_schema_id: string
    workout_id: string
    default_target: JsonNullValueInput | InputJsonValue
    order?: number
  }

  export type workout_schemaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    default_target?: JsonNullValueInput | InputJsonValue
    order?: IntFieldUpdateOperationsInput | number
  }

  export type workout_schemaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    session_schema_id?: StringFieldUpdateOperationsInput | string
    workout_id?: StringFieldUpdateOperationsInput | string
    default_target?: JsonNullValueInput | InputJsonValue
    order?: IntFieldUpdateOperationsInput | number
  }

  export type superset_schemaCreateInput = {
    id: string
    name: string
    session_schema: session_schemaCreateNestedOneWithoutSuperset_schemaInput
    superset_workout_schema?: superset_workout_schemaCreateNestedManyWithoutSuperset_schemaInput
  }

  export type superset_schemaUncheckedCreateInput = {
    id: string
    name: string
    session_schema_id: string
    superset_workout_schema?: superset_workout_schemaUncheckedCreateNestedManyWithoutSuperset_schemaInput
  }

  export type superset_schemaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    session_schema?: session_schemaUpdateOneRequiredWithoutSuperset_schemaInput
    superset_workout_schema?: superset_workout_schemaUpdateManyWithoutSuperset_schemaInput
  }

  export type superset_schemaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    session_schema_id?: StringFieldUpdateOperationsInput | string
    superset_workout_schema?: superset_workout_schemaUncheckedUpdateManyWithoutSuperset_schemaInput
  }

  export type superset_schemaCreateManyInput = {
    id: string
    name: string
    session_schema_id: string
  }

  export type superset_schemaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type superset_schemaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    session_schema_id?: StringFieldUpdateOperationsInput | string
  }

  export type superset_workout_schemaCreateInput = {
    id: string
    superset_schema: superset_schemaCreateNestedOneWithoutSuperset_workout_schemaInput
    workout: workoutCreateNestedOneWithoutSuperset_workout_schemaInput
    default_target: JsonNullValueInput | InputJsonValue
    order?: number
    superset_workout_instance?: superset_workout_instanceCreateNestedManyWithoutSuperset_workout_schemaInput
  }

  export type superset_workout_schemaUncheckedCreateInput = {
    id: string
    superset_schema_id: string
    workout_id: string
    default_target: JsonNullValueInput | InputJsonValue
    order?: number
    superset_workout_instance?: superset_workout_instanceUncheckedCreateNestedManyWithoutSuperset_workout_schemaInput
  }

  export type superset_workout_schemaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    superset_schema?: superset_schemaUpdateOneRequiredWithoutSuperset_workout_schemaInput
    workout?: workoutUpdateOneRequiredWithoutSuperset_workout_schemaInput
    default_target?: JsonNullValueInput | InputJsonValue
    order?: IntFieldUpdateOperationsInput | number
    superset_workout_instance?: superset_workout_instanceUpdateManyWithoutSuperset_workout_schemaInput
  }

  export type superset_workout_schemaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    superset_schema_id?: StringFieldUpdateOperationsInput | string
    workout_id?: StringFieldUpdateOperationsInput | string
    default_target?: JsonNullValueInput | InputJsonValue
    order?: IntFieldUpdateOperationsInput | number
    superset_workout_instance?: superset_workout_instanceUncheckedUpdateManyWithoutSuperset_workout_schemaInput
  }

  export type superset_workout_schemaCreateManyInput = {
    id: string
    superset_schema_id: string
    workout_id: string
    default_target: JsonNullValueInput | InputJsonValue
    order?: number
  }

  export type superset_workout_schemaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    default_target?: JsonNullValueInput | InputJsonValue
    order?: IntFieldUpdateOperationsInput | number
  }

  export type superset_workout_schemaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    superset_schema_id?: StringFieldUpdateOperationsInput | string
    workout_id?: StringFieldUpdateOperationsInput | string
    default_target?: JsonNullValueInput | InputJsonValue
    order?: IntFieldUpdateOperationsInput | number
  }

  export type session_instanceCreateInput = {
    id: string
    session_schema: session_schemaCreateNestedOneWithoutSession_instanceInput
    start_timestamp?: Date | string
    end_timestamp?: Date | string | null
    workout_instance?: workout_instanceCreateNestedManyWithoutSession_instanceInput
    superset_workout_instance?: superset_workout_instanceCreateNestedManyWithoutSession_instanceInput
  }

  export type session_instanceUncheckedCreateInput = {
    id: string
    session_schema_id: string
    start_timestamp?: Date | string
    end_timestamp?: Date | string | null
    workout_instance?: workout_instanceUncheckedCreateNestedManyWithoutSession_instanceInput
    superset_workout_instance?: superset_workout_instanceUncheckedCreateNestedManyWithoutSession_instanceInput
  }

  export type session_instanceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    session_schema?: session_schemaUpdateOneRequiredWithoutSession_instanceInput
    start_timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    end_timestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    workout_instance?: workout_instanceUpdateManyWithoutSession_instanceInput
    superset_workout_instance?: superset_workout_instanceUpdateManyWithoutSession_instanceInput
  }

  export type session_instanceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    session_schema_id?: StringFieldUpdateOperationsInput | string
    start_timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    end_timestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    workout_instance?: workout_instanceUncheckedUpdateManyWithoutSession_instanceInput
    superset_workout_instance?: superset_workout_instanceUncheckedUpdateManyWithoutSession_instanceInput
  }

  export type session_instanceCreateManyInput = {
    id: string
    session_schema_id: string
    start_timestamp?: Date | string
    end_timestamp?: Date | string | null
  }

  export type session_instanceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    start_timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    end_timestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type session_instanceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    session_schema_id?: StringFieldUpdateOperationsInput | string
    start_timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    end_timestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type workout_instanceCreateInput = {
    workout_schema: workout_schemaCreateNestedOneWithoutWorkout_instanceInput
    session_instance: session_instanceCreateNestedOneWithoutWorkout_instanceInput
    sets_data: JsonNullValueInput | InputJsonValue
  }

  export type workout_instanceUncheckedCreateInput = {
    workout_schema_id: string
    session_instance_id: string
    sets_data: JsonNullValueInput | InputJsonValue
  }

  export type workout_instanceUpdateInput = {
    workout_schema?: workout_schemaUpdateOneRequiredWithoutWorkout_instanceInput
    session_instance?: session_instanceUpdateOneRequiredWithoutWorkout_instanceInput
    sets_data?: JsonNullValueInput | InputJsonValue
  }

  export type workout_instanceUncheckedUpdateInput = {
    workout_schema_id?: StringFieldUpdateOperationsInput | string
    session_instance_id?: StringFieldUpdateOperationsInput | string
    sets_data?: JsonNullValueInput | InputJsonValue
  }

  export type workout_instanceCreateManyInput = {
    workout_schema_id: string
    session_instance_id: string
    sets_data: JsonNullValueInput | InputJsonValue
  }

  export type workout_instanceUpdateManyMutationInput = {
    sets_data?: JsonNullValueInput | InputJsonValue
  }

  export type workout_instanceUncheckedUpdateManyInput = {
    workout_schema_id?: StringFieldUpdateOperationsInput | string
    session_instance_id?: StringFieldUpdateOperationsInput | string
    sets_data?: JsonNullValueInput | InputJsonValue
  }

  export type superset_workout_instanceCreateInput = {
    superset_workout_schema: superset_workout_schemaCreateNestedOneWithoutSuperset_workout_instanceInput
    session_instance: session_instanceCreateNestedOneWithoutSuperset_workout_instanceInput
    sets_data: JsonNullValueInput | InputJsonValue
  }

  export type superset_workout_instanceUncheckedCreateInput = {
    superset_workout_schema_id: string
    session_instance_id: string
    sets_data: JsonNullValueInput | InputJsonValue
  }

  export type superset_workout_instanceUpdateInput = {
    superset_workout_schema?: superset_workout_schemaUpdateOneRequiredWithoutSuperset_workout_instanceInput
    session_instance?: session_instanceUpdateOneRequiredWithoutSuperset_workout_instanceInput
    sets_data?: JsonNullValueInput | InputJsonValue
  }

  export type superset_workout_instanceUncheckedUpdateInput = {
    superset_workout_schema_id?: StringFieldUpdateOperationsInput | string
    session_instance_id?: StringFieldUpdateOperationsInput | string
    sets_data?: JsonNullValueInput | InputJsonValue
  }

  export type superset_workout_instanceCreateManyInput = {
    superset_workout_schema_id: string
    session_instance_id: string
    sets_data: JsonNullValueInput | InputJsonValue
  }

  export type superset_workout_instanceUpdateManyMutationInput = {
    sets_data?: JsonNullValueInput | InputJsonValue
  }

  export type superset_workout_instanceUncheckedUpdateManyInput = {
    superset_workout_schema_id?: StringFieldUpdateOperationsInput | string
    session_instance_id?: StringFieldUpdateOperationsInput | string
    sets_data?: JsonNullValueInput | InputJsonValue
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringFilter | string
  }

  export type BoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type WorkoutListRelationFilter = {
    every?: workoutWhereInput
    some?: workoutWhereInput
    none?: workoutWhereInput
  }

  export type Session_schemaListRelationFilter = {
    every?: session_schemaWhereInput
    some?: session_schemaWhereInput
    none?: session_schemaWhereInput
  }

  export type workoutOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type session_schemaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type userCountOrderByAggregateInput = {
    id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    email?: SortOrder
    hashed_password?: SortOrder
    is_banned?: SortOrder
    created_time?: SortOrder
    last_token_generated_at?: SortOrder
  }

  export type userMaxOrderByAggregateInput = {
    id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    email?: SortOrder
    hashed_password?: SortOrder
    is_banned?: SortOrder
    created_time?: SortOrder
    last_token_generated_at?: SortOrder
  }

  export type userMinOrderByAggregateInput = {
    id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    email?: SortOrder
    hashed_password?: SortOrder
    is_banned?: SortOrder
    created_time?: SortOrder
    last_token_generated_at?: SortOrder
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type BoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type Enumworkout_typeFilter = {
    equals?: workout_type
    in?: Enumerable<workout_type>
    notIn?: Enumerable<workout_type>
    not?: NestedEnumworkout_typeFilter | workout_type
  }

  export type Enumbody_partNullableFilter = {
    equals?: body_part | null
    in?: Enumerable<body_part> | null
    notIn?: Enumerable<body_part> | null
    not?: NestedEnumbody_partNullableFilter | body_part | null
  }

  export type Enumintensity_levelsNullableFilter = {
    equals?: intensity_levels | null
    in?: Enumerable<intensity_levels> | null
    notIn?: Enumerable<intensity_levels> | null
    not?: NestedEnumintensity_levelsNullableFilter | intensity_levels | null
  }

  export type UserRelationFilter = {
    is?: userWhereInput
    isNot?: userWhereInput
  }

  export type Workout_schemaListRelationFilter = {
    every?: workout_schemaWhereInput
    some?: workout_schemaWhereInput
    none?: workout_schemaWhereInput
  }

  export type Superset_workout_schemaListRelationFilter = {
    every?: superset_workout_schemaWhereInput
    some?: superset_workout_schemaWhereInput
    none?: superset_workout_schemaWhereInput
  }

  export type workout_schemaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type superset_workout_schemaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type workoutCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    target_body_part?: SortOrder
    intensity?: SortOrder
    owner_id?: SortOrder
    is_public?: SortOrder
  }

  export type workoutMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    target_body_part?: SortOrder
    intensity?: SortOrder
    owner_id?: SortOrder
    is_public?: SortOrder
  }

  export type workoutMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    target_body_part?: SortOrder
    intensity?: SortOrder
    owner_id?: SortOrder
    is_public?: SortOrder
  }

  export type Enumworkout_typeWithAggregatesFilter = {
    equals?: workout_type
    in?: Enumerable<workout_type>
    notIn?: Enumerable<workout_type>
    not?: NestedEnumworkout_typeWithAggregatesFilter | workout_type
    _count?: NestedIntFilter
    _min?: NestedEnumworkout_typeFilter
    _max?: NestedEnumworkout_typeFilter
  }

  export type Enumbody_partNullableWithAggregatesFilter = {
    equals?: body_part | null
    in?: Enumerable<body_part> | null
    notIn?: Enumerable<body_part> | null
    not?: NestedEnumbody_partNullableWithAggregatesFilter | body_part | null
    _count?: NestedIntNullableFilter
    _min?: NestedEnumbody_partNullableFilter
    _max?: NestedEnumbody_partNullableFilter
  }

  export type Enumintensity_levelsNullableWithAggregatesFilter = {
    equals?: intensity_levels | null
    in?: Enumerable<intensity_levels> | null
    notIn?: Enumerable<intensity_levels> | null
    not?: NestedEnumintensity_levelsNullableWithAggregatesFilter | intensity_levels | null
    _count?: NestedIntNullableFilter
    _min?: NestedEnumintensity_levelsNullableFilter
    _max?: NestedEnumintensity_levelsNullableFilter
  }

  export type Superset_schemaListRelationFilter = {
    every?: superset_schemaWhereInput
    some?: superset_schemaWhereInput
    none?: superset_schemaWhereInput
  }

  export type Session_instanceListRelationFilter = {
    every?: session_instanceWhereInput
    some?: session_instanceWhereInput
    none?: session_instanceWhereInput
  }

  export type superset_schemaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type session_instanceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type session_schemaCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    owner_id?: SortOrder
  }

  export type session_schemaMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    owner_id?: SortOrder
  }

  export type session_schemaMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    owner_id?: SortOrder
  }

  export type Session_schemaRelationFilter = {
    is?: session_schemaWhereInput
    isNot?: session_schemaWhereInput
  }

  export type WorkoutRelationFilter = {
    is?: workoutWhereInput
    isNot?: workoutWhereInput
  }
  export type JsonFilter = 
    | PatchUndefined<
        Either<Required<JsonFilterBase>, Exclude<keyof Required<JsonFilterBase>, 'path'>>,
        Required<JsonFilterBase>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase>, 'path'>>

  export type JsonFilterBase = {
    equals?: JsonNullValueFilter | InputJsonValue
    not?: JsonNullValueFilter | InputJsonValue
  }

  export type IntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type Workout_instanceListRelationFilter = {
    every?: workout_instanceWhereInput
    some?: workout_instanceWhereInput
    none?: workout_instanceWhereInput
  }

  export type workout_instanceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type workout_schemaCountOrderByAggregateInput = {
    id?: SortOrder
    session_schema_id?: SortOrder
    workout_id?: SortOrder
    default_target?: SortOrder
    order?: SortOrder
  }

  export type workout_schemaAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type workout_schemaMaxOrderByAggregateInput = {
    id?: SortOrder
    session_schema_id?: SortOrder
    workout_id?: SortOrder
    order?: SortOrder
  }

  export type workout_schemaMinOrderByAggregateInput = {
    id?: SortOrder
    session_schema_id?: SortOrder
    workout_id?: SortOrder
    order?: SortOrder
  }

  export type workout_schemaSumOrderByAggregateInput = {
    order?: SortOrder
  }
  export type JsonWithAggregatesFilter = 
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase>, Exclude<keyof Required<JsonWithAggregatesFilterBase>, 'path'>>,
        Required<JsonWithAggregatesFilterBase>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase>, 'path'>>

  export type JsonWithAggregatesFilterBase = {
    equals?: JsonNullValueFilter | InputJsonValue
    not?: JsonNullValueFilter | InputJsonValue
    _count?: NestedIntFilter
    _min?: NestedJsonFilter
    _max?: NestedJsonFilter
  }

  export type IntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type superset_schemaCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    session_schema_id?: SortOrder
  }

  export type superset_schemaMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    session_schema_id?: SortOrder
  }

  export type superset_schemaMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    session_schema_id?: SortOrder
  }

  export type Superset_schemaRelationFilter = {
    is?: superset_schemaWhereInput
    isNot?: superset_schemaWhereInput
  }

  export type Superset_workout_instanceListRelationFilter = {
    every?: superset_workout_instanceWhereInput
    some?: superset_workout_instanceWhereInput
    none?: superset_workout_instanceWhereInput
  }

  export type superset_workout_instanceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type superset_workout_schemaCountOrderByAggregateInput = {
    id?: SortOrder
    superset_schema_id?: SortOrder
    workout_id?: SortOrder
    default_target?: SortOrder
    order?: SortOrder
  }

  export type superset_workout_schemaAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type superset_workout_schemaMaxOrderByAggregateInput = {
    id?: SortOrder
    superset_schema_id?: SortOrder
    workout_id?: SortOrder
    order?: SortOrder
  }

  export type superset_workout_schemaMinOrderByAggregateInput = {
    id?: SortOrder
    superset_schema_id?: SortOrder
    workout_id?: SortOrder
    order?: SortOrder
  }

  export type superset_workout_schemaSumOrderByAggregateInput = {
    order?: SortOrder
  }

  export type DateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type session_instanceCountOrderByAggregateInput = {
    id?: SortOrder
    session_schema_id?: SortOrder
    start_timestamp?: SortOrder
    end_timestamp?: SortOrder
  }

  export type session_instanceMaxOrderByAggregateInput = {
    id?: SortOrder
    session_schema_id?: SortOrder
    start_timestamp?: SortOrder
    end_timestamp?: SortOrder
  }

  export type session_instanceMinOrderByAggregateInput = {
    id?: SortOrder
    session_schema_id?: SortOrder
    start_timestamp?: SortOrder
    end_timestamp?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
  }

  export type Workout_schemaRelationFilter = {
    is?: workout_schemaWhereInput
    isNot?: workout_schemaWhereInput
  }

  export type Session_instanceRelationFilter = {
    is?: session_instanceWhereInput
    isNot?: session_instanceWhereInput
  }

  export type workout_instanceSession_instance_idWorkout_schema_idCompoundUniqueInput = {
    session_instance_id: string
    workout_schema_id: string
  }

  export type workout_instanceCountOrderByAggregateInput = {
    workout_schema_id?: SortOrder
    session_instance_id?: SortOrder
    sets_data?: SortOrder
  }

  export type workout_instanceMaxOrderByAggregateInput = {
    workout_schema_id?: SortOrder
    session_instance_id?: SortOrder
  }

  export type workout_instanceMinOrderByAggregateInput = {
    workout_schema_id?: SortOrder
    session_instance_id?: SortOrder
  }

  export type Superset_workout_schemaRelationFilter = {
    is?: superset_workout_schemaWhereInput
    isNot?: superset_workout_schemaWhereInput
  }

  export type superset_workout_instanceSession_instance_idSuperset_workout_schema_idCompoundUniqueInput = {
    session_instance_id: string
    superset_workout_schema_id: string
  }

  export type superset_workout_instanceCountOrderByAggregateInput = {
    superset_workout_schema_id?: SortOrder
    session_instance_id?: SortOrder
    sets_data?: SortOrder
  }

  export type superset_workout_instanceMaxOrderByAggregateInput = {
    superset_workout_schema_id?: SortOrder
    session_instance_id?: SortOrder
  }

  export type superset_workout_instanceMinOrderByAggregateInput = {
    superset_workout_schema_id?: SortOrder
    session_instance_id?: SortOrder
  }

  export type workoutCreateNestedManyWithoutOwnerInput = {
    create?: XOR<Enumerable<workoutCreateWithoutOwnerInput>, Enumerable<workoutUncheckedCreateWithoutOwnerInput>>
    connectOrCreate?: Enumerable<workoutCreateOrConnectWithoutOwnerInput>
    createMany?: workoutCreateManyOwnerInputEnvelope
    connect?: Enumerable<workoutWhereUniqueInput>
  }

  export type session_schemaCreateNestedManyWithoutOwnerInput = {
    create?: XOR<Enumerable<session_schemaCreateWithoutOwnerInput>, Enumerable<session_schemaUncheckedCreateWithoutOwnerInput>>
    connectOrCreate?: Enumerable<session_schemaCreateOrConnectWithoutOwnerInput>
    createMany?: session_schemaCreateManyOwnerInputEnvelope
    connect?: Enumerable<session_schemaWhereUniqueInput>
  }

  export type workoutUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<Enumerable<workoutCreateWithoutOwnerInput>, Enumerable<workoutUncheckedCreateWithoutOwnerInput>>
    connectOrCreate?: Enumerable<workoutCreateOrConnectWithoutOwnerInput>
    createMany?: workoutCreateManyOwnerInputEnvelope
    connect?: Enumerable<workoutWhereUniqueInput>
  }

  export type session_schemaUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<Enumerable<session_schemaCreateWithoutOwnerInput>, Enumerable<session_schemaUncheckedCreateWithoutOwnerInput>>
    connectOrCreate?: Enumerable<session_schemaCreateOrConnectWithoutOwnerInput>
    createMany?: session_schemaCreateManyOwnerInputEnvelope
    connect?: Enumerable<session_schemaWhereUniqueInput>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type workoutUpdateManyWithoutOwnerInput = {
    create?: XOR<Enumerable<workoutCreateWithoutOwnerInput>, Enumerable<workoutUncheckedCreateWithoutOwnerInput>>
    connectOrCreate?: Enumerable<workoutCreateOrConnectWithoutOwnerInput>
    upsert?: Enumerable<workoutUpsertWithWhereUniqueWithoutOwnerInput>
    createMany?: workoutCreateManyOwnerInputEnvelope
    set?: Enumerable<workoutWhereUniqueInput>
    disconnect?: Enumerable<workoutWhereUniqueInput>
    delete?: Enumerable<workoutWhereUniqueInput>
    connect?: Enumerable<workoutWhereUniqueInput>
    update?: Enumerable<workoutUpdateWithWhereUniqueWithoutOwnerInput>
    updateMany?: Enumerable<workoutUpdateManyWithWhereWithoutOwnerInput>
    deleteMany?: Enumerable<workoutScalarWhereInput>
  }

  export type session_schemaUpdateManyWithoutOwnerInput = {
    create?: XOR<Enumerable<session_schemaCreateWithoutOwnerInput>, Enumerable<session_schemaUncheckedCreateWithoutOwnerInput>>
    connectOrCreate?: Enumerable<session_schemaCreateOrConnectWithoutOwnerInput>
    upsert?: Enumerable<session_schemaUpsertWithWhereUniqueWithoutOwnerInput>
    createMany?: session_schemaCreateManyOwnerInputEnvelope
    set?: Enumerable<session_schemaWhereUniqueInput>
    disconnect?: Enumerable<session_schemaWhereUniqueInput>
    delete?: Enumerable<session_schemaWhereUniqueInput>
    connect?: Enumerable<session_schemaWhereUniqueInput>
    update?: Enumerable<session_schemaUpdateWithWhereUniqueWithoutOwnerInput>
    updateMany?: Enumerable<session_schemaUpdateManyWithWhereWithoutOwnerInput>
    deleteMany?: Enumerable<session_schemaScalarWhereInput>
  }

  export type workoutUncheckedUpdateManyWithoutOwnerInput = {
    create?: XOR<Enumerable<workoutCreateWithoutOwnerInput>, Enumerable<workoutUncheckedCreateWithoutOwnerInput>>
    connectOrCreate?: Enumerable<workoutCreateOrConnectWithoutOwnerInput>
    upsert?: Enumerable<workoutUpsertWithWhereUniqueWithoutOwnerInput>
    createMany?: workoutCreateManyOwnerInputEnvelope
    set?: Enumerable<workoutWhereUniqueInput>
    disconnect?: Enumerable<workoutWhereUniqueInput>
    delete?: Enumerable<workoutWhereUniqueInput>
    connect?: Enumerable<workoutWhereUniqueInput>
    update?: Enumerable<workoutUpdateWithWhereUniqueWithoutOwnerInput>
    updateMany?: Enumerable<workoutUpdateManyWithWhereWithoutOwnerInput>
    deleteMany?: Enumerable<workoutScalarWhereInput>
  }

  export type session_schemaUncheckedUpdateManyWithoutOwnerInput = {
    create?: XOR<Enumerable<session_schemaCreateWithoutOwnerInput>, Enumerable<session_schemaUncheckedCreateWithoutOwnerInput>>
    connectOrCreate?: Enumerable<session_schemaCreateOrConnectWithoutOwnerInput>
    upsert?: Enumerable<session_schemaUpsertWithWhereUniqueWithoutOwnerInput>
    createMany?: session_schemaCreateManyOwnerInputEnvelope
    set?: Enumerable<session_schemaWhereUniqueInput>
    disconnect?: Enumerable<session_schemaWhereUniqueInput>
    delete?: Enumerable<session_schemaWhereUniqueInput>
    connect?: Enumerable<session_schemaWhereUniqueInput>
    update?: Enumerable<session_schemaUpdateWithWhereUniqueWithoutOwnerInput>
    updateMany?: Enumerable<session_schemaUpdateManyWithWhereWithoutOwnerInput>
    deleteMany?: Enumerable<session_schemaScalarWhereInput>
  }

  export type userCreateNestedOneWithoutWorkoutInput = {
    create?: XOR<userCreateWithoutWorkoutInput, userUncheckedCreateWithoutWorkoutInput>
    connectOrCreate?: userCreateOrConnectWithoutWorkoutInput
    connect?: userWhereUniqueInput
  }

  export type workout_schemaCreateNestedManyWithoutWorkoutInput = {
    create?: XOR<Enumerable<workout_schemaCreateWithoutWorkoutInput>, Enumerable<workout_schemaUncheckedCreateWithoutWorkoutInput>>
    connectOrCreate?: Enumerable<workout_schemaCreateOrConnectWithoutWorkoutInput>
    createMany?: workout_schemaCreateManyWorkoutInputEnvelope
    connect?: Enumerable<workout_schemaWhereUniqueInput>
  }

  export type superset_workout_schemaCreateNestedManyWithoutWorkoutInput = {
    create?: XOR<Enumerable<superset_workout_schemaCreateWithoutWorkoutInput>, Enumerable<superset_workout_schemaUncheckedCreateWithoutWorkoutInput>>
    connectOrCreate?: Enumerable<superset_workout_schemaCreateOrConnectWithoutWorkoutInput>
    createMany?: superset_workout_schemaCreateManyWorkoutInputEnvelope
    connect?: Enumerable<superset_workout_schemaWhereUniqueInput>
  }

  export type workout_schemaUncheckedCreateNestedManyWithoutWorkoutInput = {
    create?: XOR<Enumerable<workout_schemaCreateWithoutWorkoutInput>, Enumerable<workout_schemaUncheckedCreateWithoutWorkoutInput>>
    connectOrCreate?: Enumerable<workout_schemaCreateOrConnectWithoutWorkoutInput>
    createMany?: workout_schemaCreateManyWorkoutInputEnvelope
    connect?: Enumerable<workout_schemaWhereUniqueInput>
  }

  export type superset_workout_schemaUncheckedCreateNestedManyWithoutWorkoutInput = {
    create?: XOR<Enumerable<superset_workout_schemaCreateWithoutWorkoutInput>, Enumerable<superset_workout_schemaUncheckedCreateWithoutWorkoutInput>>
    connectOrCreate?: Enumerable<superset_workout_schemaCreateOrConnectWithoutWorkoutInput>
    createMany?: superset_workout_schemaCreateManyWorkoutInputEnvelope
    connect?: Enumerable<superset_workout_schemaWhereUniqueInput>
  }

  export type Enumworkout_typeFieldUpdateOperationsInput = {
    set?: workout_type
  }

  export type NullableEnumbody_partFieldUpdateOperationsInput = {
    set?: body_part | null
  }

  export type NullableEnumintensity_levelsFieldUpdateOperationsInput = {
    set?: intensity_levels | null
  }

  export type userUpdateOneRequiredWithoutWorkoutInput = {
    create?: XOR<userCreateWithoutWorkoutInput, userUncheckedCreateWithoutWorkoutInput>
    connectOrCreate?: userCreateOrConnectWithoutWorkoutInput
    upsert?: userUpsertWithoutWorkoutInput
    connect?: userWhereUniqueInput
    update?: XOR<userUpdateWithoutWorkoutInput, userUncheckedUpdateWithoutWorkoutInput>
  }

  export type workout_schemaUpdateManyWithoutWorkoutInput = {
    create?: XOR<Enumerable<workout_schemaCreateWithoutWorkoutInput>, Enumerable<workout_schemaUncheckedCreateWithoutWorkoutInput>>
    connectOrCreate?: Enumerable<workout_schemaCreateOrConnectWithoutWorkoutInput>
    upsert?: Enumerable<workout_schemaUpsertWithWhereUniqueWithoutWorkoutInput>
    createMany?: workout_schemaCreateManyWorkoutInputEnvelope
    set?: Enumerable<workout_schemaWhereUniqueInput>
    disconnect?: Enumerable<workout_schemaWhereUniqueInput>
    delete?: Enumerable<workout_schemaWhereUniqueInput>
    connect?: Enumerable<workout_schemaWhereUniqueInput>
    update?: Enumerable<workout_schemaUpdateWithWhereUniqueWithoutWorkoutInput>
    updateMany?: Enumerable<workout_schemaUpdateManyWithWhereWithoutWorkoutInput>
    deleteMany?: Enumerable<workout_schemaScalarWhereInput>
  }

  export type superset_workout_schemaUpdateManyWithoutWorkoutInput = {
    create?: XOR<Enumerable<superset_workout_schemaCreateWithoutWorkoutInput>, Enumerable<superset_workout_schemaUncheckedCreateWithoutWorkoutInput>>
    connectOrCreate?: Enumerable<superset_workout_schemaCreateOrConnectWithoutWorkoutInput>
    upsert?: Enumerable<superset_workout_schemaUpsertWithWhereUniqueWithoutWorkoutInput>
    createMany?: superset_workout_schemaCreateManyWorkoutInputEnvelope
    set?: Enumerable<superset_workout_schemaWhereUniqueInput>
    disconnect?: Enumerable<superset_workout_schemaWhereUniqueInput>
    delete?: Enumerable<superset_workout_schemaWhereUniqueInput>
    connect?: Enumerable<superset_workout_schemaWhereUniqueInput>
    update?: Enumerable<superset_workout_schemaUpdateWithWhereUniqueWithoutWorkoutInput>
    updateMany?: Enumerable<superset_workout_schemaUpdateManyWithWhereWithoutWorkoutInput>
    deleteMany?: Enumerable<superset_workout_schemaScalarWhereInput>
  }

  export type workout_schemaUncheckedUpdateManyWithoutWorkoutInput = {
    create?: XOR<Enumerable<workout_schemaCreateWithoutWorkoutInput>, Enumerable<workout_schemaUncheckedCreateWithoutWorkoutInput>>
    connectOrCreate?: Enumerable<workout_schemaCreateOrConnectWithoutWorkoutInput>
    upsert?: Enumerable<workout_schemaUpsertWithWhereUniqueWithoutWorkoutInput>
    createMany?: workout_schemaCreateManyWorkoutInputEnvelope
    set?: Enumerable<workout_schemaWhereUniqueInput>
    disconnect?: Enumerable<workout_schemaWhereUniqueInput>
    delete?: Enumerable<workout_schemaWhereUniqueInput>
    connect?: Enumerable<workout_schemaWhereUniqueInput>
    update?: Enumerable<workout_schemaUpdateWithWhereUniqueWithoutWorkoutInput>
    updateMany?: Enumerable<workout_schemaUpdateManyWithWhereWithoutWorkoutInput>
    deleteMany?: Enumerable<workout_schemaScalarWhereInput>
  }

  export type superset_workout_schemaUncheckedUpdateManyWithoutWorkoutInput = {
    create?: XOR<Enumerable<superset_workout_schemaCreateWithoutWorkoutInput>, Enumerable<superset_workout_schemaUncheckedCreateWithoutWorkoutInput>>
    connectOrCreate?: Enumerable<superset_workout_schemaCreateOrConnectWithoutWorkoutInput>
    upsert?: Enumerable<superset_workout_schemaUpsertWithWhereUniqueWithoutWorkoutInput>
    createMany?: superset_workout_schemaCreateManyWorkoutInputEnvelope
    set?: Enumerable<superset_workout_schemaWhereUniqueInput>
    disconnect?: Enumerable<superset_workout_schemaWhereUniqueInput>
    delete?: Enumerable<superset_workout_schemaWhereUniqueInput>
    connect?: Enumerable<superset_workout_schemaWhereUniqueInput>
    update?: Enumerable<superset_workout_schemaUpdateWithWhereUniqueWithoutWorkoutInput>
    updateMany?: Enumerable<superset_workout_schemaUpdateManyWithWhereWithoutWorkoutInput>
    deleteMany?: Enumerable<superset_workout_schemaScalarWhereInput>
  }

  export type userCreateNestedOneWithoutSession_schemaInput = {
    create?: XOR<userCreateWithoutSession_schemaInput, userUncheckedCreateWithoutSession_schemaInput>
    connectOrCreate?: userCreateOrConnectWithoutSession_schemaInput
    connect?: userWhereUniqueInput
  }

  export type workout_schemaCreateNestedManyWithoutSession_schemaInput = {
    create?: XOR<Enumerable<workout_schemaCreateWithoutSession_schemaInput>, Enumerable<workout_schemaUncheckedCreateWithoutSession_schemaInput>>
    connectOrCreate?: Enumerable<workout_schemaCreateOrConnectWithoutSession_schemaInput>
    createMany?: workout_schemaCreateManySession_schemaInputEnvelope
    connect?: Enumerable<workout_schemaWhereUniqueInput>
  }

  export type superset_schemaCreateNestedManyWithoutSession_schemaInput = {
    create?: XOR<Enumerable<superset_schemaCreateWithoutSession_schemaInput>, Enumerable<superset_schemaUncheckedCreateWithoutSession_schemaInput>>
    connectOrCreate?: Enumerable<superset_schemaCreateOrConnectWithoutSession_schemaInput>
    createMany?: superset_schemaCreateManySession_schemaInputEnvelope
    connect?: Enumerable<superset_schemaWhereUniqueInput>
  }

  export type session_instanceCreateNestedManyWithoutSession_schemaInput = {
    create?: XOR<Enumerable<session_instanceCreateWithoutSession_schemaInput>, Enumerable<session_instanceUncheckedCreateWithoutSession_schemaInput>>
    connectOrCreate?: Enumerable<session_instanceCreateOrConnectWithoutSession_schemaInput>
    createMany?: session_instanceCreateManySession_schemaInputEnvelope
    connect?: Enumerable<session_instanceWhereUniqueInput>
  }

  export type workout_schemaUncheckedCreateNestedManyWithoutSession_schemaInput = {
    create?: XOR<Enumerable<workout_schemaCreateWithoutSession_schemaInput>, Enumerable<workout_schemaUncheckedCreateWithoutSession_schemaInput>>
    connectOrCreate?: Enumerable<workout_schemaCreateOrConnectWithoutSession_schemaInput>
    createMany?: workout_schemaCreateManySession_schemaInputEnvelope
    connect?: Enumerable<workout_schemaWhereUniqueInput>
  }

  export type superset_schemaUncheckedCreateNestedManyWithoutSession_schemaInput = {
    create?: XOR<Enumerable<superset_schemaCreateWithoutSession_schemaInput>, Enumerable<superset_schemaUncheckedCreateWithoutSession_schemaInput>>
    connectOrCreate?: Enumerable<superset_schemaCreateOrConnectWithoutSession_schemaInput>
    createMany?: superset_schemaCreateManySession_schemaInputEnvelope
    connect?: Enumerable<superset_schemaWhereUniqueInput>
  }

  export type session_instanceUncheckedCreateNestedManyWithoutSession_schemaInput = {
    create?: XOR<Enumerable<session_instanceCreateWithoutSession_schemaInput>, Enumerable<session_instanceUncheckedCreateWithoutSession_schemaInput>>
    connectOrCreate?: Enumerable<session_instanceCreateOrConnectWithoutSession_schemaInput>
    createMany?: session_instanceCreateManySession_schemaInputEnvelope
    connect?: Enumerable<session_instanceWhereUniqueInput>
  }

  export type userUpdateOneRequiredWithoutSession_schemaInput = {
    create?: XOR<userCreateWithoutSession_schemaInput, userUncheckedCreateWithoutSession_schemaInput>
    connectOrCreate?: userCreateOrConnectWithoutSession_schemaInput
    upsert?: userUpsertWithoutSession_schemaInput
    connect?: userWhereUniqueInput
    update?: XOR<userUpdateWithoutSession_schemaInput, userUncheckedUpdateWithoutSession_schemaInput>
  }

  export type workout_schemaUpdateManyWithoutSession_schemaInput = {
    create?: XOR<Enumerable<workout_schemaCreateWithoutSession_schemaInput>, Enumerable<workout_schemaUncheckedCreateWithoutSession_schemaInput>>
    connectOrCreate?: Enumerable<workout_schemaCreateOrConnectWithoutSession_schemaInput>
    upsert?: Enumerable<workout_schemaUpsertWithWhereUniqueWithoutSession_schemaInput>
    createMany?: workout_schemaCreateManySession_schemaInputEnvelope
    set?: Enumerable<workout_schemaWhereUniqueInput>
    disconnect?: Enumerable<workout_schemaWhereUniqueInput>
    delete?: Enumerable<workout_schemaWhereUniqueInput>
    connect?: Enumerable<workout_schemaWhereUniqueInput>
    update?: Enumerable<workout_schemaUpdateWithWhereUniqueWithoutSession_schemaInput>
    updateMany?: Enumerable<workout_schemaUpdateManyWithWhereWithoutSession_schemaInput>
    deleteMany?: Enumerable<workout_schemaScalarWhereInput>
  }

  export type superset_schemaUpdateManyWithoutSession_schemaInput = {
    create?: XOR<Enumerable<superset_schemaCreateWithoutSession_schemaInput>, Enumerable<superset_schemaUncheckedCreateWithoutSession_schemaInput>>
    connectOrCreate?: Enumerable<superset_schemaCreateOrConnectWithoutSession_schemaInput>
    upsert?: Enumerable<superset_schemaUpsertWithWhereUniqueWithoutSession_schemaInput>
    createMany?: superset_schemaCreateManySession_schemaInputEnvelope
    set?: Enumerable<superset_schemaWhereUniqueInput>
    disconnect?: Enumerable<superset_schemaWhereUniqueInput>
    delete?: Enumerable<superset_schemaWhereUniqueInput>
    connect?: Enumerable<superset_schemaWhereUniqueInput>
    update?: Enumerable<superset_schemaUpdateWithWhereUniqueWithoutSession_schemaInput>
    updateMany?: Enumerable<superset_schemaUpdateManyWithWhereWithoutSession_schemaInput>
    deleteMany?: Enumerable<superset_schemaScalarWhereInput>
  }

  export type session_instanceUpdateManyWithoutSession_schemaInput = {
    create?: XOR<Enumerable<session_instanceCreateWithoutSession_schemaInput>, Enumerable<session_instanceUncheckedCreateWithoutSession_schemaInput>>
    connectOrCreate?: Enumerable<session_instanceCreateOrConnectWithoutSession_schemaInput>
    upsert?: Enumerable<session_instanceUpsertWithWhereUniqueWithoutSession_schemaInput>
    createMany?: session_instanceCreateManySession_schemaInputEnvelope
    set?: Enumerable<session_instanceWhereUniqueInput>
    disconnect?: Enumerable<session_instanceWhereUniqueInput>
    delete?: Enumerable<session_instanceWhereUniqueInput>
    connect?: Enumerable<session_instanceWhereUniqueInput>
    update?: Enumerable<session_instanceUpdateWithWhereUniqueWithoutSession_schemaInput>
    updateMany?: Enumerable<session_instanceUpdateManyWithWhereWithoutSession_schemaInput>
    deleteMany?: Enumerable<session_instanceScalarWhereInput>
  }

  export type workout_schemaUncheckedUpdateManyWithoutSession_schemaInput = {
    create?: XOR<Enumerable<workout_schemaCreateWithoutSession_schemaInput>, Enumerable<workout_schemaUncheckedCreateWithoutSession_schemaInput>>
    connectOrCreate?: Enumerable<workout_schemaCreateOrConnectWithoutSession_schemaInput>
    upsert?: Enumerable<workout_schemaUpsertWithWhereUniqueWithoutSession_schemaInput>
    createMany?: workout_schemaCreateManySession_schemaInputEnvelope
    set?: Enumerable<workout_schemaWhereUniqueInput>
    disconnect?: Enumerable<workout_schemaWhereUniqueInput>
    delete?: Enumerable<workout_schemaWhereUniqueInput>
    connect?: Enumerable<workout_schemaWhereUniqueInput>
    update?: Enumerable<workout_schemaUpdateWithWhereUniqueWithoutSession_schemaInput>
    updateMany?: Enumerable<workout_schemaUpdateManyWithWhereWithoutSession_schemaInput>
    deleteMany?: Enumerable<workout_schemaScalarWhereInput>
  }

  export type superset_schemaUncheckedUpdateManyWithoutSession_schemaInput = {
    create?: XOR<Enumerable<superset_schemaCreateWithoutSession_schemaInput>, Enumerable<superset_schemaUncheckedCreateWithoutSession_schemaInput>>
    connectOrCreate?: Enumerable<superset_schemaCreateOrConnectWithoutSession_schemaInput>
    upsert?: Enumerable<superset_schemaUpsertWithWhereUniqueWithoutSession_schemaInput>
    createMany?: superset_schemaCreateManySession_schemaInputEnvelope
    set?: Enumerable<superset_schemaWhereUniqueInput>
    disconnect?: Enumerable<superset_schemaWhereUniqueInput>
    delete?: Enumerable<superset_schemaWhereUniqueInput>
    connect?: Enumerable<superset_schemaWhereUniqueInput>
    update?: Enumerable<superset_schemaUpdateWithWhereUniqueWithoutSession_schemaInput>
    updateMany?: Enumerable<superset_schemaUpdateManyWithWhereWithoutSession_schemaInput>
    deleteMany?: Enumerable<superset_schemaScalarWhereInput>
  }

  export type session_instanceUncheckedUpdateManyWithoutSession_schemaInput = {
    create?: XOR<Enumerable<session_instanceCreateWithoutSession_schemaInput>, Enumerable<session_instanceUncheckedCreateWithoutSession_schemaInput>>
    connectOrCreate?: Enumerable<session_instanceCreateOrConnectWithoutSession_schemaInput>
    upsert?: Enumerable<session_instanceUpsertWithWhereUniqueWithoutSession_schemaInput>
    createMany?: session_instanceCreateManySession_schemaInputEnvelope
    set?: Enumerable<session_instanceWhereUniqueInput>
    disconnect?: Enumerable<session_instanceWhereUniqueInput>
    delete?: Enumerable<session_instanceWhereUniqueInput>
    connect?: Enumerable<session_instanceWhereUniqueInput>
    update?: Enumerable<session_instanceUpdateWithWhereUniqueWithoutSession_schemaInput>
    updateMany?: Enumerable<session_instanceUpdateManyWithWhereWithoutSession_schemaInput>
    deleteMany?: Enumerable<session_instanceScalarWhereInput>
  }

  export type session_schemaCreateNestedOneWithoutWorkout_schemaInput = {
    create?: XOR<session_schemaCreateWithoutWorkout_schemaInput, session_schemaUncheckedCreateWithoutWorkout_schemaInput>
    connectOrCreate?: session_schemaCreateOrConnectWithoutWorkout_schemaInput
    connect?: session_schemaWhereUniqueInput
  }

  export type workoutCreateNestedOneWithoutWorkout_schemaInput = {
    create?: XOR<workoutCreateWithoutWorkout_schemaInput, workoutUncheckedCreateWithoutWorkout_schemaInput>
    connectOrCreate?: workoutCreateOrConnectWithoutWorkout_schemaInput
    connect?: workoutWhereUniqueInput
  }

  export type workout_instanceCreateNestedManyWithoutWorkout_schemaInput = {
    create?: XOR<Enumerable<workout_instanceCreateWithoutWorkout_schemaInput>, Enumerable<workout_instanceUncheckedCreateWithoutWorkout_schemaInput>>
    connectOrCreate?: Enumerable<workout_instanceCreateOrConnectWithoutWorkout_schemaInput>
    createMany?: workout_instanceCreateManyWorkout_schemaInputEnvelope
    connect?: Enumerable<workout_instanceWhereUniqueInput>
  }

  export type workout_instanceUncheckedCreateNestedManyWithoutWorkout_schemaInput = {
    create?: XOR<Enumerable<workout_instanceCreateWithoutWorkout_schemaInput>, Enumerable<workout_instanceUncheckedCreateWithoutWorkout_schemaInput>>
    connectOrCreate?: Enumerable<workout_instanceCreateOrConnectWithoutWorkout_schemaInput>
    createMany?: workout_instanceCreateManyWorkout_schemaInputEnvelope
    connect?: Enumerable<workout_instanceWhereUniqueInput>
  }

  export type session_schemaUpdateOneRequiredWithoutWorkout_schemaInput = {
    create?: XOR<session_schemaCreateWithoutWorkout_schemaInput, session_schemaUncheckedCreateWithoutWorkout_schemaInput>
    connectOrCreate?: session_schemaCreateOrConnectWithoutWorkout_schemaInput
    upsert?: session_schemaUpsertWithoutWorkout_schemaInput
    connect?: session_schemaWhereUniqueInput
    update?: XOR<session_schemaUpdateWithoutWorkout_schemaInput, session_schemaUncheckedUpdateWithoutWorkout_schemaInput>
  }

  export type workoutUpdateOneRequiredWithoutWorkout_schemaInput = {
    create?: XOR<workoutCreateWithoutWorkout_schemaInput, workoutUncheckedCreateWithoutWorkout_schemaInput>
    connectOrCreate?: workoutCreateOrConnectWithoutWorkout_schemaInput
    upsert?: workoutUpsertWithoutWorkout_schemaInput
    connect?: workoutWhereUniqueInput
    update?: XOR<workoutUpdateWithoutWorkout_schemaInput, workoutUncheckedUpdateWithoutWorkout_schemaInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type workout_instanceUpdateManyWithoutWorkout_schemaInput = {
    create?: XOR<Enumerable<workout_instanceCreateWithoutWorkout_schemaInput>, Enumerable<workout_instanceUncheckedCreateWithoutWorkout_schemaInput>>
    connectOrCreate?: Enumerable<workout_instanceCreateOrConnectWithoutWorkout_schemaInput>
    upsert?: Enumerable<workout_instanceUpsertWithWhereUniqueWithoutWorkout_schemaInput>
    createMany?: workout_instanceCreateManyWorkout_schemaInputEnvelope
    set?: Enumerable<workout_instanceWhereUniqueInput>
    disconnect?: Enumerable<workout_instanceWhereUniqueInput>
    delete?: Enumerable<workout_instanceWhereUniqueInput>
    connect?: Enumerable<workout_instanceWhereUniqueInput>
    update?: Enumerable<workout_instanceUpdateWithWhereUniqueWithoutWorkout_schemaInput>
    updateMany?: Enumerable<workout_instanceUpdateManyWithWhereWithoutWorkout_schemaInput>
    deleteMany?: Enumerable<workout_instanceScalarWhereInput>
  }

  export type workout_instanceUncheckedUpdateManyWithoutWorkout_schemaInput = {
    create?: XOR<Enumerable<workout_instanceCreateWithoutWorkout_schemaInput>, Enumerable<workout_instanceUncheckedCreateWithoutWorkout_schemaInput>>
    connectOrCreate?: Enumerable<workout_instanceCreateOrConnectWithoutWorkout_schemaInput>
    upsert?: Enumerable<workout_instanceUpsertWithWhereUniqueWithoutWorkout_schemaInput>
    createMany?: workout_instanceCreateManyWorkout_schemaInputEnvelope
    set?: Enumerable<workout_instanceWhereUniqueInput>
    disconnect?: Enumerable<workout_instanceWhereUniqueInput>
    delete?: Enumerable<workout_instanceWhereUniqueInput>
    connect?: Enumerable<workout_instanceWhereUniqueInput>
    update?: Enumerable<workout_instanceUpdateWithWhereUniqueWithoutWorkout_schemaInput>
    updateMany?: Enumerable<workout_instanceUpdateManyWithWhereWithoutWorkout_schemaInput>
    deleteMany?: Enumerable<workout_instanceScalarWhereInput>
  }

  export type session_schemaCreateNestedOneWithoutSuperset_schemaInput = {
    create?: XOR<session_schemaCreateWithoutSuperset_schemaInput, session_schemaUncheckedCreateWithoutSuperset_schemaInput>
    connectOrCreate?: session_schemaCreateOrConnectWithoutSuperset_schemaInput
    connect?: session_schemaWhereUniqueInput
  }

  export type superset_workout_schemaCreateNestedManyWithoutSuperset_schemaInput = {
    create?: XOR<Enumerable<superset_workout_schemaCreateWithoutSuperset_schemaInput>, Enumerable<superset_workout_schemaUncheckedCreateWithoutSuperset_schemaInput>>
    connectOrCreate?: Enumerable<superset_workout_schemaCreateOrConnectWithoutSuperset_schemaInput>
    createMany?: superset_workout_schemaCreateManySuperset_schemaInputEnvelope
    connect?: Enumerable<superset_workout_schemaWhereUniqueInput>
  }

  export type superset_workout_schemaUncheckedCreateNestedManyWithoutSuperset_schemaInput = {
    create?: XOR<Enumerable<superset_workout_schemaCreateWithoutSuperset_schemaInput>, Enumerable<superset_workout_schemaUncheckedCreateWithoutSuperset_schemaInput>>
    connectOrCreate?: Enumerable<superset_workout_schemaCreateOrConnectWithoutSuperset_schemaInput>
    createMany?: superset_workout_schemaCreateManySuperset_schemaInputEnvelope
    connect?: Enumerable<superset_workout_schemaWhereUniqueInput>
  }

  export type session_schemaUpdateOneRequiredWithoutSuperset_schemaInput = {
    create?: XOR<session_schemaCreateWithoutSuperset_schemaInput, session_schemaUncheckedCreateWithoutSuperset_schemaInput>
    connectOrCreate?: session_schemaCreateOrConnectWithoutSuperset_schemaInput
    upsert?: session_schemaUpsertWithoutSuperset_schemaInput
    connect?: session_schemaWhereUniqueInput
    update?: XOR<session_schemaUpdateWithoutSuperset_schemaInput, session_schemaUncheckedUpdateWithoutSuperset_schemaInput>
  }

  export type superset_workout_schemaUpdateManyWithoutSuperset_schemaInput = {
    create?: XOR<Enumerable<superset_workout_schemaCreateWithoutSuperset_schemaInput>, Enumerable<superset_workout_schemaUncheckedCreateWithoutSuperset_schemaInput>>
    connectOrCreate?: Enumerable<superset_workout_schemaCreateOrConnectWithoutSuperset_schemaInput>
    upsert?: Enumerable<superset_workout_schemaUpsertWithWhereUniqueWithoutSuperset_schemaInput>
    createMany?: superset_workout_schemaCreateManySuperset_schemaInputEnvelope
    set?: Enumerable<superset_workout_schemaWhereUniqueInput>
    disconnect?: Enumerable<superset_workout_schemaWhereUniqueInput>
    delete?: Enumerable<superset_workout_schemaWhereUniqueInput>
    connect?: Enumerable<superset_workout_schemaWhereUniqueInput>
    update?: Enumerable<superset_workout_schemaUpdateWithWhereUniqueWithoutSuperset_schemaInput>
    updateMany?: Enumerable<superset_workout_schemaUpdateManyWithWhereWithoutSuperset_schemaInput>
    deleteMany?: Enumerable<superset_workout_schemaScalarWhereInput>
  }

  export type superset_workout_schemaUncheckedUpdateManyWithoutSuperset_schemaInput = {
    create?: XOR<Enumerable<superset_workout_schemaCreateWithoutSuperset_schemaInput>, Enumerable<superset_workout_schemaUncheckedCreateWithoutSuperset_schemaInput>>
    connectOrCreate?: Enumerable<superset_workout_schemaCreateOrConnectWithoutSuperset_schemaInput>
    upsert?: Enumerable<superset_workout_schemaUpsertWithWhereUniqueWithoutSuperset_schemaInput>
    createMany?: superset_workout_schemaCreateManySuperset_schemaInputEnvelope
    set?: Enumerable<superset_workout_schemaWhereUniqueInput>
    disconnect?: Enumerable<superset_workout_schemaWhereUniqueInput>
    delete?: Enumerable<superset_workout_schemaWhereUniqueInput>
    connect?: Enumerable<superset_workout_schemaWhereUniqueInput>
    update?: Enumerable<superset_workout_schemaUpdateWithWhereUniqueWithoutSuperset_schemaInput>
    updateMany?: Enumerable<superset_workout_schemaUpdateManyWithWhereWithoutSuperset_schemaInput>
    deleteMany?: Enumerable<superset_workout_schemaScalarWhereInput>
  }

  export type superset_schemaCreateNestedOneWithoutSuperset_workout_schemaInput = {
    create?: XOR<superset_schemaCreateWithoutSuperset_workout_schemaInput, superset_schemaUncheckedCreateWithoutSuperset_workout_schemaInput>
    connectOrCreate?: superset_schemaCreateOrConnectWithoutSuperset_workout_schemaInput
    connect?: superset_schemaWhereUniqueInput
  }

  export type workoutCreateNestedOneWithoutSuperset_workout_schemaInput = {
    create?: XOR<workoutCreateWithoutSuperset_workout_schemaInput, workoutUncheckedCreateWithoutSuperset_workout_schemaInput>
    connectOrCreate?: workoutCreateOrConnectWithoutSuperset_workout_schemaInput
    connect?: workoutWhereUniqueInput
  }

  export type superset_workout_instanceCreateNestedManyWithoutSuperset_workout_schemaInput = {
    create?: XOR<Enumerable<superset_workout_instanceCreateWithoutSuperset_workout_schemaInput>, Enumerable<superset_workout_instanceUncheckedCreateWithoutSuperset_workout_schemaInput>>
    connectOrCreate?: Enumerable<superset_workout_instanceCreateOrConnectWithoutSuperset_workout_schemaInput>
    createMany?: superset_workout_instanceCreateManySuperset_workout_schemaInputEnvelope
    connect?: Enumerable<superset_workout_instanceWhereUniqueInput>
  }

  export type superset_workout_instanceUncheckedCreateNestedManyWithoutSuperset_workout_schemaInput = {
    create?: XOR<Enumerable<superset_workout_instanceCreateWithoutSuperset_workout_schemaInput>, Enumerable<superset_workout_instanceUncheckedCreateWithoutSuperset_workout_schemaInput>>
    connectOrCreate?: Enumerable<superset_workout_instanceCreateOrConnectWithoutSuperset_workout_schemaInput>
    createMany?: superset_workout_instanceCreateManySuperset_workout_schemaInputEnvelope
    connect?: Enumerable<superset_workout_instanceWhereUniqueInput>
  }

  export type superset_schemaUpdateOneRequiredWithoutSuperset_workout_schemaInput = {
    create?: XOR<superset_schemaCreateWithoutSuperset_workout_schemaInput, superset_schemaUncheckedCreateWithoutSuperset_workout_schemaInput>
    connectOrCreate?: superset_schemaCreateOrConnectWithoutSuperset_workout_schemaInput
    upsert?: superset_schemaUpsertWithoutSuperset_workout_schemaInput
    connect?: superset_schemaWhereUniqueInput
    update?: XOR<superset_schemaUpdateWithoutSuperset_workout_schemaInput, superset_schemaUncheckedUpdateWithoutSuperset_workout_schemaInput>
  }

  export type workoutUpdateOneRequiredWithoutSuperset_workout_schemaInput = {
    create?: XOR<workoutCreateWithoutSuperset_workout_schemaInput, workoutUncheckedCreateWithoutSuperset_workout_schemaInput>
    connectOrCreate?: workoutCreateOrConnectWithoutSuperset_workout_schemaInput
    upsert?: workoutUpsertWithoutSuperset_workout_schemaInput
    connect?: workoutWhereUniqueInput
    update?: XOR<workoutUpdateWithoutSuperset_workout_schemaInput, workoutUncheckedUpdateWithoutSuperset_workout_schemaInput>
  }

  export type superset_workout_instanceUpdateManyWithoutSuperset_workout_schemaInput = {
    create?: XOR<Enumerable<superset_workout_instanceCreateWithoutSuperset_workout_schemaInput>, Enumerable<superset_workout_instanceUncheckedCreateWithoutSuperset_workout_schemaInput>>
    connectOrCreate?: Enumerable<superset_workout_instanceCreateOrConnectWithoutSuperset_workout_schemaInput>
    upsert?: Enumerable<superset_workout_instanceUpsertWithWhereUniqueWithoutSuperset_workout_schemaInput>
    createMany?: superset_workout_instanceCreateManySuperset_workout_schemaInputEnvelope
    set?: Enumerable<superset_workout_instanceWhereUniqueInput>
    disconnect?: Enumerable<superset_workout_instanceWhereUniqueInput>
    delete?: Enumerable<superset_workout_instanceWhereUniqueInput>
    connect?: Enumerable<superset_workout_instanceWhereUniqueInput>
    update?: Enumerable<superset_workout_instanceUpdateWithWhereUniqueWithoutSuperset_workout_schemaInput>
    updateMany?: Enumerable<superset_workout_instanceUpdateManyWithWhereWithoutSuperset_workout_schemaInput>
    deleteMany?: Enumerable<superset_workout_instanceScalarWhereInput>
  }

  export type superset_workout_instanceUncheckedUpdateManyWithoutSuperset_workout_schemaInput = {
    create?: XOR<Enumerable<superset_workout_instanceCreateWithoutSuperset_workout_schemaInput>, Enumerable<superset_workout_instanceUncheckedCreateWithoutSuperset_workout_schemaInput>>
    connectOrCreate?: Enumerable<superset_workout_instanceCreateOrConnectWithoutSuperset_workout_schemaInput>
    upsert?: Enumerable<superset_workout_instanceUpsertWithWhereUniqueWithoutSuperset_workout_schemaInput>
    createMany?: superset_workout_instanceCreateManySuperset_workout_schemaInputEnvelope
    set?: Enumerable<superset_workout_instanceWhereUniqueInput>
    disconnect?: Enumerable<superset_workout_instanceWhereUniqueInput>
    delete?: Enumerable<superset_workout_instanceWhereUniqueInput>
    connect?: Enumerable<superset_workout_instanceWhereUniqueInput>
    update?: Enumerable<superset_workout_instanceUpdateWithWhereUniqueWithoutSuperset_workout_schemaInput>
    updateMany?: Enumerable<superset_workout_instanceUpdateManyWithWhereWithoutSuperset_workout_schemaInput>
    deleteMany?: Enumerable<superset_workout_instanceScalarWhereInput>
  }

  export type session_schemaCreateNestedOneWithoutSession_instanceInput = {
    create?: XOR<session_schemaCreateWithoutSession_instanceInput, session_schemaUncheckedCreateWithoutSession_instanceInput>
    connectOrCreate?: session_schemaCreateOrConnectWithoutSession_instanceInput
    connect?: session_schemaWhereUniqueInput
  }

  export type workout_instanceCreateNestedManyWithoutSession_instanceInput = {
    create?: XOR<Enumerable<workout_instanceCreateWithoutSession_instanceInput>, Enumerable<workout_instanceUncheckedCreateWithoutSession_instanceInput>>
    connectOrCreate?: Enumerable<workout_instanceCreateOrConnectWithoutSession_instanceInput>
    createMany?: workout_instanceCreateManySession_instanceInputEnvelope
    connect?: Enumerable<workout_instanceWhereUniqueInput>
  }

  export type superset_workout_instanceCreateNestedManyWithoutSession_instanceInput = {
    create?: XOR<Enumerable<superset_workout_instanceCreateWithoutSession_instanceInput>, Enumerable<superset_workout_instanceUncheckedCreateWithoutSession_instanceInput>>
    connectOrCreate?: Enumerable<superset_workout_instanceCreateOrConnectWithoutSession_instanceInput>
    createMany?: superset_workout_instanceCreateManySession_instanceInputEnvelope
    connect?: Enumerable<superset_workout_instanceWhereUniqueInput>
  }

  export type workout_instanceUncheckedCreateNestedManyWithoutSession_instanceInput = {
    create?: XOR<Enumerable<workout_instanceCreateWithoutSession_instanceInput>, Enumerable<workout_instanceUncheckedCreateWithoutSession_instanceInput>>
    connectOrCreate?: Enumerable<workout_instanceCreateOrConnectWithoutSession_instanceInput>
    createMany?: workout_instanceCreateManySession_instanceInputEnvelope
    connect?: Enumerable<workout_instanceWhereUniqueInput>
  }

  export type superset_workout_instanceUncheckedCreateNestedManyWithoutSession_instanceInput = {
    create?: XOR<Enumerable<superset_workout_instanceCreateWithoutSession_instanceInput>, Enumerable<superset_workout_instanceUncheckedCreateWithoutSession_instanceInput>>
    connectOrCreate?: Enumerable<superset_workout_instanceCreateOrConnectWithoutSession_instanceInput>
    createMany?: superset_workout_instanceCreateManySession_instanceInputEnvelope
    connect?: Enumerable<superset_workout_instanceWhereUniqueInput>
  }

  export type session_schemaUpdateOneRequiredWithoutSession_instanceInput = {
    create?: XOR<session_schemaCreateWithoutSession_instanceInput, session_schemaUncheckedCreateWithoutSession_instanceInput>
    connectOrCreate?: session_schemaCreateOrConnectWithoutSession_instanceInput
    upsert?: session_schemaUpsertWithoutSession_instanceInput
    connect?: session_schemaWhereUniqueInput
    update?: XOR<session_schemaUpdateWithoutSession_instanceInput, session_schemaUncheckedUpdateWithoutSession_instanceInput>
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type workout_instanceUpdateManyWithoutSession_instanceInput = {
    create?: XOR<Enumerable<workout_instanceCreateWithoutSession_instanceInput>, Enumerable<workout_instanceUncheckedCreateWithoutSession_instanceInput>>
    connectOrCreate?: Enumerable<workout_instanceCreateOrConnectWithoutSession_instanceInput>
    upsert?: Enumerable<workout_instanceUpsertWithWhereUniqueWithoutSession_instanceInput>
    createMany?: workout_instanceCreateManySession_instanceInputEnvelope
    set?: Enumerable<workout_instanceWhereUniqueInput>
    disconnect?: Enumerable<workout_instanceWhereUniqueInput>
    delete?: Enumerable<workout_instanceWhereUniqueInput>
    connect?: Enumerable<workout_instanceWhereUniqueInput>
    update?: Enumerable<workout_instanceUpdateWithWhereUniqueWithoutSession_instanceInput>
    updateMany?: Enumerable<workout_instanceUpdateManyWithWhereWithoutSession_instanceInput>
    deleteMany?: Enumerable<workout_instanceScalarWhereInput>
  }

  export type superset_workout_instanceUpdateManyWithoutSession_instanceInput = {
    create?: XOR<Enumerable<superset_workout_instanceCreateWithoutSession_instanceInput>, Enumerable<superset_workout_instanceUncheckedCreateWithoutSession_instanceInput>>
    connectOrCreate?: Enumerable<superset_workout_instanceCreateOrConnectWithoutSession_instanceInput>
    upsert?: Enumerable<superset_workout_instanceUpsertWithWhereUniqueWithoutSession_instanceInput>
    createMany?: superset_workout_instanceCreateManySession_instanceInputEnvelope
    set?: Enumerable<superset_workout_instanceWhereUniqueInput>
    disconnect?: Enumerable<superset_workout_instanceWhereUniqueInput>
    delete?: Enumerable<superset_workout_instanceWhereUniqueInput>
    connect?: Enumerable<superset_workout_instanceWhereUniqueInput>
    update?: Enumerable<superset_workout_instanceUpdateWithWhereUniqueWithoutSession_instanceInput>
    updateMany?: Enumerable<superset_workout_instanceUpdateManyWithWhereWithoutSession_instanceInput>
    deleteMany?: Enumerable<superset_workout_instanceScalarWhereInput>
  }

  export type workout_instanceUncheckedUpdateManyWithoutSession_instanceInput = {
    create?: XOR<Enumerable<workout_instanceCreateWithoutSession_instanceInput>, Enumerable<workout_instanceUncheckedCreateWithoutSession_instanceInput>>
    connectOrCreate?: Enumerable<workout_instanceCreateOrConnectWithoutSession_instanceInput>
    upsert?: Enumerable<workout_instanceUpsertWithWhereUniqueWithoutSession_instanceInput>
    createMany?: workout_instanceCreateManySession_instanceInputEnvelope
    set?: Enumerable<workout_instanceWhereUniqueInput>
    disconnect?: Enumerable<workout_instanceWhereUniqueInput>
    delete?: Enumerable<workout_instanceWhereUniqueInput>
    connect?: Enumerable<workout_instanceWhereUniqueInput>
    update?: Enumerable<workout_instanceUpdateWithWhereUniqueWithoutSession_instanceInput>
    updateMany?: Enumerable<workout_instanceUpdateManyWithWhereWithoutSession_instanceInput>
    deleteMany?: Enumerable<workout_instanceScalarWhereInput>
  }

  export type superset_workout_instanceUncheckedUpdateManyWithoutSession_instanceInput = {
    create?: XOR<Enumerable<superset_workout_instanceCreateWithoutSession_instanceInput>, Enumerable<superset_workout_instanceUncheckedCreateWithoutSession_instanceInput>>
    connectOrCreate?: Enumerable<superset_workout_instanceCreateOrConnectWithoutSession_instanceInput>
    upsert?: Enumerable<superset_workout_instanceUpsertWithWhereUniqueWithoutSession_instanceInput>
    createMany?: superset_workout_instanceCreateManySession_instanceInputEnvelope
    set?: Enumerable<superset_workout_instanceWhereUniqueInput>
    disconnect?: Enumerable<superset_workout_instanceWhereUniqueInput>
    delete?: Enumerable<superset_workout_instanceWhereUniqueInput>
    connect?: Enumerable<superset_workout_instanceWhereUniqueInput>
    update?: Enumerable<superset_workout_instanceUpdateWithWhereUniqueWithoutSession_instanceInput>
    updateMany?: Enumerable<superset_workout_instanceUpdateManyWithWhereWithoutSession_instanceInput>
    deleteMany?: Enumerable<superset_workout_instanceScalarWhereInput>
  }

  export type workout_schemaCreateNestedOneWithoutWorkout_instanceInput = {
    create?: XOR<workout_schemaCreateWithoutWorkout_instanceInput, workout_schemaUncheckedCreateWithoutWorkout_instanceInput>
    connectOrCreate?: workout_schemaCreateOrConnectWithoutWorkout_instanceInput
    connect?: workout_schemaWhereUniqueInput
  }

  export type session_instanceCreateNestedOneWithoutWorkout_instanceInput = {
    create?: XOR<session_instanceCreateWithoutWorkout_instanceInput, session_instanceUncheckedCreateWithoutWorkout_instanceInput>
    connectOrCreate?: session_instanceCreateOrConnectWithoutWorkout_instanceInput
    connect?: session_instanceWhereUniqueInput
  }

  export type workout_schemaUpdateOneRequiredWithoutWorkout_instanceInput = {
    create?: XOR<workout_schemaCreateWithoutWorkout_instanceInput, workout_schemaUncheckedCreateWithoutWorkout_instanceInput>
    connectOrCreate?: workout_schemaCreateOrConnectWithoutWorkout_instanceInput
    upsert?: workout_schemaUpsertWithoutWorkout_instanceInput
    connect?: workout_schemaWhereUniqueInput
    update?: XOR<workout_schemaUpdateWithoutWorkout_instanceInput, workout_schemaUncheckedUpdateWithoutWorkout_instanceInput>
  }

  export type session_instanceUpdateOneRequiredWithoutWorkout_instanceInput = {
    create?: XOR<session_instanceCreateWithoutWorkout_instanceInput, session_instanceUncheckedCreateWithoutWorkout_instanceInput>
    connectOrCreate?: session_instanceCreateOrConnectWithoutWorkout_instanceInput
    upsert?: session_instanceUpsertWithoutWorkout_instanceInput
    connect?: session_instanceWhereUniqueInput
    update?: XOR<session_instanceUpdateWithoutWorkout_instanceInput, session_instanceUncheckedUpdateWithoutWorkout_instanceInput>
  }

  export type superset_workout_schemaCreateNestedOneWithoutSuperset_workout_instanceInput = {
    create?: XOR<superset_workout_schemaCreateWithoutSuperset_workout_instanceInput, superset_workout_schemaUncheckedCreateWithoutSuperset_workout_instanceInput>
    connectOrCreate?: superset_workout_schemaCreateOrConnectWithoutSuperset_workout_instanceInput
    connect?: superset_workout_schemaWhereUniqueInput
  }

  export type session_instanceCreateNestedOneWithoutSuperset_workout_instanceInput = {
    create?: XOR<session_instanceCreateWithoutSuperset_workout_instanceInput, session_instanceUncheckedCreateWithoutSuperset_workout_instanceInput>
    connectOrCreate?: session_instanceCreateOrConnectWithoutSuperset_workout_instanceInput
    connect?: session_instanceWhereUniqueInput
  }

  export type superset_workout_schemaUpdateOneRequiredWithoutSuperset_workout_instanceInput = {
    create?: XOR<superset_workout_schemaCreateWithoutSuperset_workout_instanceInput, superset_workout_schemaUncheckedCreateWithoutSuperset_workout_instanceInput>
    connectOrCreate?: superset_workout_schemaCreateOrConnectWithoutSuperset_workout_instanceInput
    upsert?: superset_workout_schemaUpsertWithoutSuperset_workout_instanceInput
    connect?: superset_workout_schemaWhereUniqueInput
    update?: XOR<superset_workout_schemaUpdateWithoutSuperset_workout_instanceInput, superset_workout_schemaUncheckedUpdateWithoutSuperset_workout_instanceInput>
  }

  export type session_instanceUpdateOneRequiredWithoutSuperset_workout_instanceInput = {
    create?: XOR<session_instanceCreateWithoutSuperset_workout_instanceInput, session_instanceUncheckedCreateWithoutSuperset_workout_instanceInput>
    connectOrCreate?: session_instanceCreateOrConnectWithoutSuperset_workout_instanceInput
    upsert?: session_instanceUpsertWithoutSuperset_workout_instanceInput
    connect?: session_instanceWhereUniqueInput
    update?: XOR<session_instanceUpdateWithoutSuperset_workout_instanceInput, session_instanceUncheckedUpdateWithoutSuperset_workout_instanceInput>
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedBoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedBoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type NestedEnumworkout_typeFilter = {
    equals?: workout_type
    in?: Enumerable<workout_type>
    notIn?: Enumerable<workout_type>
    not?: NestedEnumworkout_typeFilter | workout_type
  }

  export type NestedEnumbody_partNullableFilter = {
    equals?: body_part | null
    in?: Enumerable<body_part> | null
    notIn?: Enumerable<body_part> | null
    not?: NestedEnumbody_partNullableFilter | body_part | null
  }

  export type NestedEnumintensity_levelsNullableFilter = {
    equals?: intensity_levels | null
    in?: Enumerable<intensity_levels> | null
    notIn?: Enumerable<intensity_levels> | null
    not?: NestedEnumintensity_levelsNullableFilter | intensity_levels | null
  }

  export type NestedEnumworkout_typeWithAggregatesFilter = {
    equals?: workout_type
    in?: Enumerable<workout_type>
    notIn?: Enumerable<workout_type>
    not?: NestedEnumworkout_typeWithAggregatesFilter | workout_type
    _count?: NestedIntFilter
    _min?: NestedEnumworkout_typeFilter
    _max?: NestedEnumworkout_typeFilter
  }

  export type NestedEnumbody_partNullableWithAggregatesFilter = {
    equals?: body_part | null
    in?: Enumerable<body_part> | null
    notIn?: Enumerable<body_part> | null
    not?: NestedEnumbody_partNullableWithAggregatesFilter | body_part | null
    _count?: NestedIntNullableFilter
    _min?: NestedEnumbody_partNullableFilter
    _max?: NestedEnumbody_partNullableFilter
  }

  export type NestedIntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type NestedEnumintensity_levelsNullableWithAggregatesFilter = {
    equals?: intensity_levels | null
    in?: Enumerable<intensity_levels> | null
    notIn?: Enumerable<intensity_levels> | null
    not?: NestedEnumintensity_levelsNullableWithAggregatesFilter | intensity_levels | null
    _count?: NestedIntNullableFilter
    _min?: NestedEnumintensity_levelsNullableFilter
    _max?: NestedEnumintensity_levelsNullableFilter
  }
  export type NestedJsonFilter = 
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase>, Exclude<keyof Required<NestedJsonFilterBase>, 'path'>>,
        Required<NestedJsonFilterBase>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase>, 'path'>>

  export type NestedJsonFilterBase = {
    equals?: JsonNullValueFilter | InputJsonValue
    not?: JsonNullValueFilter | InputJsonValue
  }

  export type NestedIntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type NestedFloatFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type NestedDateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
  }

  export type workoutCreateWithoutOwnerInput = {
    id: string
    name: string
    category: workout_type
    target_body_part?: body_part | null
    intensity?: intensity_levels | null
    is_public?: boolean
    workout_schema?: workout_schemaCreateNestedManyWithoutWorkoutInput
    superset_workout_schema?: superset_workout_schemaCreateNestedManyWithoutWorkoutInput
  }

  export type workoutUncheckedCreateWithoutOwnerInput = {
    id: string
    name: string
    category: workout_type
    target_body_part?: body_part | null
    intensity?: intensity_levels | null
    is_public?: boolean
    workout_schema?: workout_schemaUncheckedCreateNestedManyWithoutWorkoutInput
    superset_workout_schema?: superset_workout_schemaUncheckedCreateNestedManyWithoutWorkoutInput
  }

  export type workoutCreateOrConnectWithoutOwnerInput = {
    where: workoutWhereUniqueInput
    create: XOR<workoutCreateWithoutOwnerInput, workoutUncheckedCreateWithoutOwnerInput>
  }

  export type workoutCreateManyOwnerInputEnvelope = {
    data: Enumerable<workoutCreateManyOwnerInput>
    skipDuplicates?: boolean
  }

  export type session_schemaCreateWithoutOwnerInput = {
    id: string
    name: string
    workout_schema?: workout_schemaCreateNestedManyWithoutSession_schemaInput
    superset_schema?: superset_schemaCreateNestedManyWithoutSession_schemaInput
    session_instance?: session_instanceCreateNestedManyWithoutSession_schemaInput
  }

  export type session_schemaUncheckedCreateWithoutOwnerInput = {
    id: string
    name: string
    workout_schema?: workout_schemaUncheckedCreateNestedManyWithoutSession_schemaInput
    superset_schema?: superset_schemaUncheckedCreateNestedManyWithoutSession_schemaInput
    session_instance?: session_instanceUncheckedCreateNestedManyWithoutSession_schemaInput
  }

  export type session_schemaCreateOrConnectWithoutOwnerInput = {
    where: session_schemaWhereUniqueInput
    create: XOR<session_schemaCreateWithoutOwnerInput, session_schemaUncheckedCreateWithoutOwnerInput>
  }

  export type session_schemaCreateManyOwnerInputEnvelope = {
    data: Enumerable<session_schemaCreateManyOwnerInput>
    skipDuplicates?: boolean
  }

  export type workoutUpsertWithWhereUniqueWithoutOwnerInput = {
    where: workoutWhereUniqueInput
    update: XOR<workoutUpdateWithoutOwnerInput, workoutUncheckedUpdateWithoutOwnerInput>
    create: XOR<workoutCreateWithoutOwnerInput, workoutUncheckedCreateWithoutOwnerInput>
  }

  export type workoutUpdateWithWhereUniqueWithoutOwnerInput = {
    where: workoutWhereUniqueInput
    data: XOR<workoutUpdateWithoutOwnerInput, workoutUncheckedUpdateWithoutOwnerInput>
  }

  export type workoutUpdateManyWithWhereWithoutOwnerInput = {
    where: workoutScalarWhereInput
    data: XOR<workoutUpdateManyMutationInput, workoutUncheckedUpdateManyWithoutWorkoutInput>
  }

  export type workoutScalarWhereInput = {
    AND?: Enumerable<workoutScalarWhereInput>
    OR?: Enumerable<workoutScalarWhereInput>
    NOT?: Enumerable<workoutScalarWhereInput>
    id?: StringFilter | string
    name?: StringFilter | string
    category?: Enumworkout_typeFilter | workout_type
    target_body_part?: Enumbody_partNullableFilter | body_part | null
    intensity?: Enumintensity_levelsNullableFilter | intensity_levels | null
    owner_id?: StringFilter | string
    is_public?: BoolFilter | boolean
  }

  export type session_schemaUpsertWithWhereUniqueWithoutOwnerInput = {
    where: session_schemaWhereUniqueInput
    update: XOR<session_schemaUpdateWithoutOwnerInput, session_schemaUncheckedUpdateWithoutOwnerInput>
    create: XOR<session_schemaCreateWithoutOwnerInput, session_schemaUncheckedCreateWithoutOwnerInput>
  }

  export type session_schemaUpdateWithWhereUniqueWithoutOwnerInput = {
    where: session_schemaWhereUniqueInput
    data: XOR<session_schemaUpdateWithoutOwnerInput, session_schemaUncheckedUpdateWithoutOwnerInput>
  }

  export type session_schemaUpdateManyWithWhereWithoutOwnerInput = {
    where: session_schemaScalarWhereInput
    data: XOR<session_schemaUpdateManyMutationInput, session_schemaUncheckedUpdateManyWithoutSession_schemaInput>
  }

  export type session_schemaScalarWhereInput = {
    AND?: Enumerable<session_schemaScalarWhereInput>
    OR?: Enumerable<session_schemaScalarWhereInput>
    NOT?: Enumerable<session_schemaScalarWhereInput>
    id?: StringFilter | string
    name?: StringFilter | string
    owner_id?: StringFilter | string
  }

  export type userCreateWithoutWorkoutInput = {
    id: string
    first_name: string
    last_name: string
    email: string
    hashed_password: string
    is_banned?: boolean
    created_time?: Date | string
    last_token_generated_at?: Date | string
    session_schema?: session_schemaCreateNestedManyWithoutOwnerInput
  }

  export type userUncheckedCreateWithoutWorkoutInput = {
    id: string
    first_name: string
    last_name: string
    email: string
    hashed_password: string
    is_banned?: boolean
    created_time?: Date | string
    last_token_generated_at?: Date | string
    session_schema?: session_schemaUncheckedCreateNestedManyWithoutOwnerInput
  }

  export type userCreateOrConnectWithoutWorkoutInput = {
    where: userWhereUniqueInput
    create: XOR<userCreateWithoutWorkoutInput, userUncheckedCreateWithoutWorkoutInput>
  }

  export type workout_schemaCreateWithoutWorkoutInput = {
    id: string
    session_schema: session_schemaCreateNestedOneWithoutWorkout_schemaInput
    default_target: JsonNullValueInput | InputJsonValue
    order?: number
    workout_instance?: workout_instanceCreateNestedManyWithoutWorkout_schemaInput
  }

  export type workout_schemaUncheckedCreateWithoutWorkoutInput = {
    id: string
    session_schema_id: string
    default_target: JsonNullValueInput | InputJsonValue
    order?: number
    workout_instance?: workout_instanceUncheckedCreateNestedManyWithoutWorkout_schemaInput
  }

  export type workout_schemaCreateOrConnectWithoutWorkoutInput = {
    where: workout_schemaWhereUniqueInput
    create: XOR<workout_schemaCreateWithoutWorkoutInput, workout_schemaUncheckedCreateWithoutWorkoutInput>
  }

  export type workout_schemaCreateManyWorkoutInputEnvelope = {
    data: Enumerable<workout_schemaCreateManyWorkoutInput>
    skipDuplicates?: boolean
  }

  export type superset_workout_schemaCreateWithoutWorkoutInput = {
    id: string
    superset_schema: superset_schemaCreateNestedOneWithoutSuperset_workout_schemaInput
    default_target: JsonNullValueInput | InputJsonValue
    order?: number
    superset_workout_instance?: superset_workout_instanceCreateNestedManyWithoutSuperset_workout_schemaInput
  }

  export type superset_workout_schemaUncheckedCreateWithoutWorkoutInput = {
    id: string
    superset_schema_id: string
    default_target: JsonNullValueInput | InputJsonValue
    order?: number
    superset_workout_instance?: superset_workout_instanceUncheckedCreateNestedManyWithoutSuperset_workout_schemaInput
  }

  export type superset_workout_schemaCreateOrConnectWithoutWorkoutInput = {
    where: superset_workout_schemaWhereUniqueInput
    create: XOR<superset_workout_schemaCreateWithoutWorkoutInput, superset_workout_schemaUncheckedCreateWithoutWorkoutInput>
  }

  export type superset_workout_schemaCreateManyWorkoutInputEnvelope = {
    data: Enumerable<superset_workout_schemaCreateManyWorkoutInput>
    skipDuplicates?: boolean
  }

  export type userUpsertWithoutWorkoutInput = {
    update: XOR<userUpdateWithoutWorkoutInput, userUncheckedUpdateWithoutWorkoutInput>
    create: XOR<userCreateWithoutWorkoutInput, userUncheckedCreateWithoutWorkoutInput>
  }

  export type userUpdateWithoutWorkoutInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashed_password?: StringFieldUpdateOperationsInput | string
    is_banned?: BoolFieldUpdateOperationsInput | boolean
    created_time?: DateTimeFieldUpdateOperationsInput | Date | string
    last_token_generated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    session_schema?: session_schemaUpdateManyWithoutOwnerInput
  }

  export type userUncheckedUpdateWithoutWorkoutInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashed_password?: StringFieldUpdateOperationsInput | string
    is_banned?: BoolFieldUpdateOperationsInput | boolean
    created_time?: DateTimeFieldUpdateOperationsInput | Date | string
    last_token_generated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    session_schema?: session_schemaUncheckedUpdateManyWithoutOwnerInput
  }

  export type workout_schemaUpsertWithWhereUniqueWithoutWorkoutInput = {
    where: workout_schemaWhereUniqueInput
    update: XOR<workout_schemaUpdateWithoutWorkoutInput, workout_schemaUncheckedUpdateWithoutWorkoutInput>
    create: XOR<workout_schemaCreateWithoutWorkoutInput, workout_schemaUncheckedCreateWithoutWorkoutInput>
  }

  export type workout_schemaUpdateWithWhereUniqueWithoutWorkoutInput = {
    where: workout_schemaWhereUniqueInput
    data: XOR<workout_schemaUpdateWithoutWorkoutInput, workout_schemaUncheckedUpdateWithoutWorkoutInput>
  }

  export type workout_schemaUpdateManyWithWhereWithoutWorkoutInput = {
    where: workout_schemaScalarWhereInput
    data: XOR<workout_schemaUpdateManyMutationInput, workout_schemaUncheckedUpdateManyWithoutWorkout_schemaInput>
  }

  export type workout_schemaScalarWhereInput = {
    AND?: Enumerable<workout_schemaScalarWhereInput>
    OR?: Enumerable<workout_schemaScalarWhereInput>
    NOT?: Enumerable<workout_schemaScalarWhereInput>
    id?: StringFilter | string
    session_schema_id?: StringFilter | string
    workout_id?: StringFilter | string
    default_target?: JsonFilter
    order?: IntFilter | number
  }

  export type superset_workout_schemaUpsertWithWhereUniqueWithoutWorkoutInput = {
    where: superset_workout_schemaWhereUniqueInput
    update: XOR<superset_workout_schemaUpdateWithoutWorkoutInput, superset_workout_schemaUncheckedUpdateWithoutWorkoutInput>
    create: XOR<superset_workout_schemaCreateWithoutWorkoutInput, superset_workout_schemaUncheckedCreateWithoutWorkoutInput>
  }

  export type superset_workout_schemaUpdateWithWhereUniqueWithoutWorkoutInput = {
    where: superset_workout_schemaWhereUniqueInput
    data: XOR<superset_workout_schemaUpdateWithoutWorkoutInput, superset_workout_schemaUncheckedUpdateWithoutWorkoutInput>
  }

  export type superset_workout_schemaUpdateManyWithWhereWithoutWorkoutInput = {
    where: superset_workout_schemaScalarWhereInput
    data: XOR<superset_workout_schemaUpdateManyMutationInput, superset_workout_schemaUncheckedUpdateManyWithoutSuperset_workout_schemaInput>
  }

  export type superset_workout_schemaScalarWhereInput = {
    AND?: Enumerable<superset_workout_schemaScalarWhereInput>
    OR?: Enumerable<superset_workout_schemaScalarWhereInput>
    NOT?: Enumerable<superset_workout_schemaScalarWhereInput>
    id?: StringFilter | string
    superset_schema_id?: StringFilter | string
    workout_id?: StringFilter | string
    default_target?: JsonFilter
    order?: IntFilter | number
  }

  export type userCreateWithoutSession_schemaInput = {
    id: string
    first_name: string
    last_name: string
    email: string
    hashed_password: string
    is_banned?: boolean
    created_time?: Date | string
    last_token_generated_at?: Date | string
    workout?: workoutCreateNestedManyWithoutOwnerInput
  }

  export type userUncheckedCreateWithoutSession_schemaInput = {
    id: string
    first_name: string
    last_name: string
    email: string
    hashed_password: string
    is_banned?: boolean
    created_time?: Date | string
    last_token_generated_at?: Date | string
    workout?: workoutUncheckedCreateNestedManyWithoutOwnerInput
  }

  export type userCreateOrConnectWithoutSession_schemaInput = {
    where: userWhereUniqueInput
    create: XOR<userCreateWithoutSession_schemaInput, userUncheckedCreateWithoutSession_schemaInput>
  }

  export type workout_schemaCreateWithoutSession_schemaInput = {
    id: string
    workout: workoutCreateNestedOneWithoutWorkout_schemaInput
    default_target: JsonNullValueInput | InputJsonValue
    order?: number
    workout_instance?: workout_instanceCreateNestedManyWithoutWorkout_schemaInput
  }

  export type workout_schemaUncheckedCreateWithoutSession_schemaInput = {
    id: string
    workout_id: string
    default_target: JsonNullValueInput | InputJsonValue
    order?: number
    workout_instance?: workout_instanceUncheckedCreateNestedManyWithoutWorkout_schemaInput
  }

  export type workout_schemaCreateOrConnectWithoutSession_schemaInput = {
    where: workout_schemaWhereUniqueInput
    create: XOR<workout_schemaCreateWithoutSession_schemaInput, workout_schemaUncheckedCreateWithoutSession_schemaInput>
  }

  export type workout_schemaCreateManySession_schemaInputEnvelope = {
    data: Enumerable<workout_schemaCreateManySession_schemaInput>
    skipDuplicates?: boolean
  }

  export type superset_schemaCreateWithoutSession_schemaInput = {
    id: string
    name: string
    superset_workout_schema?: superset_workout_schemaCreateNestedManyWithoutSuperset_schemaInput
  }

  export type superset_schemaUncheckedCreateWithoutSession_schemaInput = {
    id: string
    name: string
    superset_workout_schema?: superset_workout_schemaUncheckedCreateNestedManyWithoutSuperset_schemaInput
  }

  export type superset_schemaCreateOrConnectWithoutSession_schemaInput = {
    where: superset_schemaWhereUniqueInput
    create: XOR<superset_schemaCreateWithoutSession_schemaInput, superset_schemaUncheckedCreateWithoutSession_schemaInput>
  }

  export type superset_schemaCreateManySession_schemaInputEnvelope = {
    data: Enumerable<superset_schemaCreateManySession_schemaInput>
    skipDuplicates?: boolean
  }

  export type session_instanceCreateWithoutSession_schemaInput = {
    id: string
    start_timestamp?: Date | string
    end_timestamp?: Date | string | null
    workout_instance?: workout_instanceCreateNestedManyWithoutSession_instanceInput
    superset_workout_instance?: superset_workout_instanceCreateNestedManyWithoutSession_instanceInput
  }

  export type session_instanceUncheckedCreateWithoutSession_schemaInput = {
    id: string
    start_timestamp?: Date | string
    end_timestamp?: Date | string | null
    workout_instance?: workout_instanceUncheckedCreateNestedManyWithoutSession_instanceInput
    superset_workout_instance?: superset_workout_instanceUncheckedCreateNestedManyWithoutSession_instanceInput
  }

  export type session_instanceCreateOrConnectWithoutSession_schemaInput = {
    where: session_instanceWhereUniqueInput
    create: XOR<session_instanceCreateWithoutSession_schemaInput, session_instanceUncheckedCreateWithoutSession_schemaInput>
  }

  export type session_instanceCreateManySession_schemaInputEnvelope = {
    data: Enumerable<session_instanceCreateManySession_schemaInput>
    skipDuplicates?: boolean
  }

  export type userUpsertWithoutSession_schemaInput = {
    update: XOR<userUpdateWithoutSession_schemaInput, userUncheckedUpdateWithoutSession_schemaInput>
    create: XOR<userCreateWithoutSession_schemaInput, userUncheckedCreateWithoutSession_schemaInput>
  }

  export type userUpdateWithoutSession_schemaInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashed_password?: StringFieldUpdateOperationsInput | string
    is_banned?: BoolFieldUpdateOperationsInput | boolean
    created_time?: DateTimeFieldUpdateOperationsInput | Date | string
    last_token_generated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    workout?: workoutUpdateManyWithoutOwnerInput
  }

  export type userUncheckedUpdateWithoutSession_schemaInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashed_password?: StringFieldUpdateOperationsInput | string
    is_banned?: BoolFieldUpdateOperationsInput | boolean
    created_time?: DateTimeFieldUpdateOperationsInput | Date | string
    last_token_generated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    workout?: workoutUncheckedUpdateManyWithoutOwnerInput
  }

  export type workout_schemaUpsertWithWhereUniqueWithoutSession_schemaInput = {
    where: workout_schemaWhereUniqueInput
    update: XOR<workout_schemaUpdateWithoutSession_schemaInput, workout_schemaUncheckedUpdateWithoutSession_schemaInput>
    create: XOR<workout_schemaCreateWithoutSession_schemaInput, workout_schemaUncheckedCreateWithoutSession_schemaInput>
  }

  export type workout_schemaUpdateWithWhereUniqueWithoutSession_schemaInput = {
    where: workout_schemaWhereUniqueInput
    data: XOR<workout_schemaUpdateWithoutSession_schemaInput, workout_schemaUncheckedUpdateWithoutSession_schemaInput>
  }

  export type workout_schemaUpdateManyWithWhereWithoutSession_schemaInput = {
    where: workout_schemaScalarWhereInput
    data: XOR<workout_schemaUpdateManyMutationInput, workout_schemaUncheckedUpdateManyWithoutWorkout_schemaInput>
  }

  export type superset_schemaUpsertWithWhereUniqueWithoutSession_schemaInput = {
    where: superset_schemaWhereUniqueInput
    update: XOR<superset_schemaUpdateWithoutSession_schemaInput, superset_schemaUncheckedUpdateWithoutSession_schemaInput>
    create: XOR<superset_schemaCreateWithoutSession_schemaInput, superset_schemaUncheckedCreateWithoutSession_schemaInput>
  }

  export type superset_schemaUpdateWithWhereUniqueWithoutSession_schemaInput = {
    where: superset_schemaWhereUniqueInput
    data: XOR<superset_schemaUpdateWithoutSession_schemaInput, superset_schemaUncheckedUpdateWithoutSession_schemaInput>
  }

  export type superset_schemaUpdateManyWithWhereWithoutSession_schemaInput = {
    where: superset_schemaScalarWhereInput
    data: XOR<superset_schemaUpdateManyMutationInput, superset_schemaUncheckedUpdateManyWithoutSuperset_schemaInput>
  }

  export type superset_schemaScalarWhereInput = {
    AND?: Enumerable<superset_schemaScalarWhereInput>
    OR?: Enumerable<superset_schemaScalarWhereInput>
    NOT?: Enumerable<superset_schemaScalarWhereInput>
    id?: StringFilter | string
    name?: StringFilter | string
    session_schema_id?: StringFilter | string
  }

  export type session_instanceUpsertWithWhereUniqueWithoutSession_schemaInput = {
    where: session_instanceWhereUniqueInput
    update: XOR<session_instanceUpdateWithoutSession_schemaInput, session_instanceUncheckedUpdateWithoutSession_schemaInput>
    create: XOR<session_instanceCreateWithoutSession_schemaInput, session_instanceUncheckedCreateWithoutSession_schemaInput>
  }

  export type session_instanceUpdateWithWhereUniqueWithoutSession_schemaInput = {
    where: session_instanceWhereUniqueInput
    data: XOR<session_instanceUpdateWithoutSession_schemaInput, session_instanceUncheckedUpdateWithoutSession_schemaInput>
  }

  export type session_instanceUpdateManyWithWhereWithoutSession_schemaInput = {
    where: session_instanceScalarWhereInput
    data: XOR<session_instanceUpdateManyMutationInput, session_instanceUncheckedUpdateManyWithoutSession_instanceInput>
  }

  export type session_instanceScalarWhereInput = {
    AND?: Enumerable<session_instanceScalarWhereInput>
    OR?: Enumerable<session_instanceScalarWhereInput>
    NOT?: Enumerable<session_instanceScalarWhereInput>
    id?: StringFilter | string
    session_schema_id?: StringFilter | string
    start_timestamp?: DateTimeFilter | Date | string
    end_timestamp?: DateTimeNullableFilter | Date | string | null
  }

  export type session_schemaCreateWithoutWorkout_schemaInput = {
    id: string
    name: string
    owner: userCreateNestedOneWithoutSession_schemaInput
    superset_schema?: superset_schemaCreateNestedManyWithoutSession_schemaInput
    session_instance?: session_instanceCreateNestedManyWithoutSession_schemaInput
  }

  export type session_schemaUncheckedCreateWithoutWorkout_schemaInput = {
    id: string
    name: string
    owner_id: string
    superset_schema?: superset_schemaUncheckedCreateNestedManyWithoutSession_schemaInput
    session_instance?: session_instanceUncheckedCreateNestedManyWithoutSession_schemaInput
  }

  export type session_schemaCreateOrConnectWithoutWorkout_schemaInput = {
    where: session_schemaWhereUniqueInput
    create: XOR<session_schemaCreateWithoutWorkout_schemaInput, session_schemaUncheckedCreateWithoutWorkout_schemaInput>
  }

  export type workoutCreateWithoutWorkout_schemaInput = {
    id: string
    name: string
    category: workout_type
    target_body_part?: body_part | null
    intensity?: intensity_levels | null
    owner: userCreateNestedOneWithoutWorkoutInput
    is_public?: boolean
    superset_workout_schema?: superset_workout_schemaCreateNestedManyWithoutWorkoutInput
  }

  export type workoutUncheckedCreateWithoutWorkout_schemaInput = {
    id: string
    name: string
    category: workout_type
    target_body_part?: body_part | null
    intensity?: intensity_levels | null
    owner_id: string
    is_public?: boolean
    superset_workout_schema?: superset_workout_schemaUncheckedCreateNestedManyWithoutWorkoutInput
  }

  export type workoutCreateOrConnectWithoutWorkout_schemaInput = {
    where: workoutWhereUniqueInput
    create: XOR<workoutCreateWithoutWorkout_schemaInput, workoutUncheckedCreateWithoutWorkout_schemaInput>
  }

  export type workout_instanceCreateWithoutWorkout_schemaInput = {
    session_instance: session_instanceCreateNestedOneWithoutWorkout_instanceInput
    sets_data: JsonNullValueInput | InputJsonValue
  }

  export type workout_instanceUncheckedCreateWithoutWorkout_schemaInput = {
    session_instance_id: string
    sets_data: JsonNullValueInput | InputJsonValue
  }

  export type workout_instanceCreateOrConnectWithoutWorkout_schemaInput = {
    where: workout_instanceWhereUniqueInput
    create: XOR<workout_instanceCreateWithoutWorkout_schemaInput, workout_instanceUncheckedCreateWithoutWorkout_schemaInput>
  }

  export type workout_instanceCreateManyWorkout_schemaInputEnvelope = {
    data: Enumerable<workout_instanceCreateManyWorkout_schemaInput>
    skipDuplicates?: boolean
  }

  export type session_schemaUpsertWithoutWorkout_schemaInput = {
    update: XOR<session_schemaUpdateWithoutWorkout_schemaInput, session_schemaUncheckedUpdateWithoutWorkout_schemaInput>
    create: XOR<session_schemaCreateWithoutWorkout_schemaInput, session_schemaUncheckedCreateWithoutWorkout_schemaInput>
  }

  export type session_schemaUpdateWithoutWorkout_schemaInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    owner?: userUpdateOneRequiredWithoutSession_schemaInput
    superset_schema?: superset_schemaUpdateManyWithoutSession_schemaInput
    session_instance?: session_instanceUpdateManyWithoutSession_schemaInput
  }

  export type session_schemaUncheckedUpdateWithoutWorkout_schemaInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    owner_id?: StringFieldUpdateOperationsInput | string
    superset_schema?: superset_schemaUncheckedUpdateManyWithoutSession_schemaInput
    session_instance?: session_instanceUncheckedUpdateManyWithoutSession_schemaInput
  }

  export type workoutUpsertWithoutWorkout_schemaInput = {
    update: XOR<workoutUpdateWithoutWorkout_schemaInput, workoutUncheckedUpdateWithoutWorkout_schemaInput>
    create: XOR<workoutCreateWithoutWorkout_schemaInput, workoutUncheckedCreateWithoutWorkout_schemaInput>
  }

  export type workoutUpdateWithoutWorkout_schemaInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: Enumworkout_typeFieldUpdateOperationsInput | workout_type
    target_body_part?: NullableEnumbody_partFieldUpdateOperationsInput | body_part | null
    intensity?: NullableEnumintensity_levelsFieldUpdateOperationsInput | intensity_levels | null
    owner?: userUpdateOneRequiredWithoutWorkoutInput
    is_public?: BoolFieldUpdateOperationsInput | boolean
    superset_workout_schema?: superset_workout_schemaUpdateManyWithoutWorkoutInput
  }

  export type workoutUncheckedUpdateWithoutWorkout_schemaInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: Enumworkout_typeFieldUpdateOperationsInput | workout_type
    target_body_part?: NullableEnumbody_partFieldUpdateOperationsInput | body_part | null
    intensity?: NullableEnumintensity_levelsFieldUpdateOperationsInput | intensity_levels | null
    owner_id?: StringFieldUpdateOperationsInput | string
    is_public?: BoolFieldUpdateOperationsInput | boolean
    superset_workout_schema?: superset_workout_schemaUncheckedUpdateManyWithoutWorkoutInput
  }

  export type workout_instanceUpsertWithWhereUniqueWithoutWorkout_schemaInput = {
    where: workout_instanceWhereUniqueInput
    update: XOR<workout_instanceUpdateWithoutWorkout_schemaInput, workout_instanceUncheckedUpdateWithoutWorkout_schemaInput>
    create: XOR<workout_instanceCreateWithoutWorkout_schemaInput, workout_instanceUncheckedCreateWithoutWorkout_schemaInput>
  }

  export type workout_instanceUpdateWithWhereUniqueWithoutWorkout_schemaInput = {
    where: workout_instanceWhereUniqueInput
    data: XOR<workout_instanceUpdateWithoutWorkout_schemaInput, workout_instanceUncheckedUpdateWithoutWorkout_schemaInput>
  }

  export type workout_instanceUpdateManyWithWhereWithoutWorkout_schemaInput = {
    where: workout_instanceScalarWhereInput
    data: XOR<workout_instanceUpdateManyMutationInput, workout_instanceUncheckedUpdateManyWithoutWorkout_instanceInput>
  }

  export type workout_instanceScalarWhereInput = {
    AND?: Enumerable<workout_instanceScalarWhereInput>
    OR?: Enumerable<workout_instanceScalarWhereInput>
    NOT?: Enumerable<workout_instanceScalarWhereInput>
    workout_schema_id?: StringFilter | string
    session_instance_id?: StringFilter | string
    sets_data?: JsonFilter
  }

  export type session_schemaCreateWithoutSuperset_schemaInput = {
    id: string
    name: string
    owner: userCreateNestedOneWithoutSession_schemaInput
    workout_schema?: workout_schemaCreateNestedManyWithoutSession_schemaInput
    session_instance?: session_instanceCreateNestedManyWithoutSession_schemaInput
  }

  export type session_schemaUncheckedCreateWithoutSuperset_schemaInput = {
    id: string
    name: string
    owner_id: string
    workout_schema?: workout_schemaUncheckedCreateNestedManyWithoutSession_schemaInput
    session_instance?: session_instanceUncheckedCreateNestedManyWithoutSession_schemaInput
  }

  export type session_schemaCreateOrConnectWithoutSuperset_schemaInput = {
    where: session_schemaWhereUniqueInput
    create: XOR<session_schemaCreateWithoutSuperset_schemaInput, session_schemaUncheckedCreateWithoutSuperset_schemaInput>
  }

  export type superset_workout_schemaCreateWithoutSuperset_schemaInput = {
    id: string
    workout: workoutCreateNestedOneWithoutSuperset_workout_schemaInput
    default_target: JsonNullValueInput | InputJsonValue
    order?: number
    superset_workout_instance?: superset_workout_instanceCreateNestedManyWithoutSuperset_workout_schemaInput
  }

  export type superset_workout_schemaUncheckedCreateWithoutSuperset_schemaInput = {
    id: string
    workout_id: string
    default_target: JsonNullValueInput | InputJsonValue
    order?: number
    superset_workout_instance?: superset_workout_instanceUncheckedCreateNestedManyWithoutSuperset_workout_schemaInput
  }

  export type superset_workout_schemaCreateOrConnectWithoutSuperset_schemaInput = {
    where: superset_workout_schemaWhereUniqueInput
    create: XOR<superset_workout_schemaCreateWithoutSuperset_schemaInput, superset_workout_schemaUncheckedCreateWithoutSuperset_schemaInput>
  }

  export type superset_workout_schemaCreateManySuperset_schemaInputEnvelope = {
    data: Enumerable<superset_workout_schemaCreateManySuperset_schemaInput>
    skipDuplicates?: boolean
  }

  export type session_schemaUpsertWithoutSuperset_schemaInput = {
    update: XOR<session_schemaUpdateWithoutSuperset_schemaInput, session_schemaUncheckedUpdateWithoutSuperset_schemaInput>
    create: XOR<session_schemaCreateWithoutSuperset_schemaInput, session_schemaUncheckedCreateWithoutSuperset_schemaInput>
  }

  export type session_schemaUpdateWithoutSuperset_schemaInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    owner?: userUpdateOneRequiredWithoutSession_schemaInput
    workout_schema?: workout_schemaUpdateManyWithoutSession_schemaInput
    session_instance?: session_instanceUpdateManyWithoutSession_schemaInput
  }

  export type session_schemaUncheckedUpdateWithoutSuperset_schemaInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    owner_id?: StringFieldUpdateOperationsInput | string
    workout_schema?: workout_schemaUncheckedUpdateManyWithoutSession_schemaInput
    session_instance?: session_instanceUncheckedUpdateManyWithoutSession_schemaInput
  }

  export type superset_workout_schemaUpsertWithWhereUniqueWithoutSuperset_schemaInput = {
    where: superset_workout_schemaWhereUniqueInput
    update: XOR<superset_workout_schemaUpdateWithoutSuperset_schemaInput, superset_workout_schemaUncheckedUpdateWithoutSuperset_schemaInput>
    create: XOR<superset_workout_schemaCreateWithoutSuperset_schemaInput, superset_workout_schemaUncheckedCreateWithoutSuperset_schemaInput>
  }

  export type superset_workout_schemaUpdateWithWhereUniqueWithoutSuperset_schemaInput = {
    where: superset_workout_schemaWhereUniqueInput
    data: XOR<superset_workout_schemaUpdateWithoutSuperset_schemaInput, superset_workout_schemaUncheckedUpdateWithoutSuperset_schemaInput>
  }

  export type superset_workout_schemaUpdateManyWithWhereWithoutSuperset_schemaInput = {
    where: superset_workout_schemaScalarWhereInput
    data: XOR<superset_workout_schemaUpdateManyMutationInput, superset_workout_schemaUncheckedUpdateManyWithoutSuperset_workout_schemaInput>
  }

  export type superset_schemaCreateWithoutSuperset_workout_schemaInput = {
    id: string
    name: string
    session_schema: session_schemaCreateNestedOneWithoutSuperset_schemaInput
  }

  export type superset_schemaUncheckedCreateWithoutSuperset_workout_schemaInput = {
    id: string
    name: string
    session_schema_id: string
  }

  export type superset_schemaCreateOrConnectWithoutSuperset_workout_schemaInput = {
    where: superset_schemaWhereUniqueInput
    create: XOR<superset_schemaCreateWithoutSuperset_workout_schemaInput, superset_schemaUncheckedCreateWithoutSuperset_workout_schemaInput>
  }

  export type workoutCreateWithoutSuperset_workout_schemaInput = {
    id: string
    name: string
    category: workout_type
    target_body_part?: body_part | null
    intensity?: intensity_levels | null
    owner: userCreateNestedOneWithoutWorkoutInput
    is_public?: boolean
    workout_schema?: workout_schemaCreateNestedManyWithoutWorkoutInput
  }

  export type workoutUncheckedCreateWithoutSuperset_workout_schemaInput = {
    id: string
    name: string
    category: workout_type
    target_body_part?: body_part | null
    intensity?: intensity_levels | null
    owner_id: string
    is_public?: boolean
    workout_schema?: workout_schemaUncheckedCreateNestedManyWithoutWorkoutInput
  }

  export type workoutCreateOrConnectWithoutSuperset_workout_schemaInput = {
    where: workoutWhereUniqueInput
    create: XOR<workoutCreateWithoutSuperset_workout_schemaInput, workoutUncheckedCreateWithoutSuperset_workout_schemaInput>
  }

  export type superset_workout_instanceCreateWithoutSuperset_workout_schemaInput = {
    session_instance: session_instanceCreateNestedOneWithoutSuperset_workout_instanceInput
    sets_data: JsonNullValueInput | InputJsonValue
  }

  export type superset_workout_instanceUncheckedCreateWithoutSuperset_workout_schemaInput = {
    session_instance_id: string
    sets_data: JsonNullValueInput | InputJsonValue
  }

  export type superset_workout_instanceCreateOrConnectWithoutSuperset_workout_schemaInput = {
    where: superset_workout_instanceWhereUniqueInput
    create: XOR<superset_workout_instanceCreateWithoutSuperset_workout_schemaInput, superset_workout_instanceUncheckedCreateWithoutSuperset_workout_schemaInput>
  }

  export type superset_workout_instanceCreateManySuperset_workout_schemaInputEnvelope = {
    data: Enumerable<superset_workout_instanceCreateManySuperset_workout_schemaInput>
    skipDuplicates?: boolean
  }

  export type superset_schemaUpsertWithoutSuperset_workout_schemaInput = {
    update: XOR<superset_schemaUpdateWithoutSuperset_workout_schemaInput, superset_schemaUncheckedUpdateWithoutSuperset_workout_schemaInput>
    create: XOR<superset_schemaCreateWithoutSuperset_workout_schemaInput, superset_schemaUncheckedCreateWithoutSuperset_workout_schemaInput>
  }

  export type superset_schemaUpdateWithoutSuperset_workout_schemaInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    session_schema?: session_schemaUpdateOneRequiredWithoutSuperset_schemaInput
  }

  export type superset_schemaUncheckedUpdateWithoutSuperset_workout_schemaInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    session_schema_id?: StringFieldUpdateOperationsInput | string
  }

  export type workoutUpsertWithoutSuperset_workout_schemaInput = {
    update: XOR<workoutUpdateWithoutSuperset_workout_schemaInput, workoutUncheckedUpdateWithoutSuperset_workout_schemaInput>
    create: XOR<workoutCreateWithoutSuperset_workout_schemaInput, workoutUncheckedCreateWithoutSuperset_workout_schemaInput>
  }

  export type workoutUpdateWithoutSuperset_workout_schemaInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: Enumworkout_typeFieldUpdateOperationsInput | workout_type
    target_body_part?: NullableEnumbody_partFieldUpdateOperationsInput | body_part | null
    intensity?: NullableEnumintensity_levelsFieldUpdateOperationsInput | intensity_levels | null
    owner?: userUpdateOneRequiredWithoutWorkoutInput
    is_public?: BoolFieldUpdateOperationsInput | boolean
    workout_schema?: workout_schemaUpdateManyWithoutWorkoutInput
  }

  export type workoutUncheckedUpdateWithoutSuperset_workout_schemaInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: Enumworkout_typeFieldUpdateOperationsInput | workout_type
    target_body_part?: NullableEnumbody_partFieldUpdateOperationsInput | body_part | null
    intensity?: NullableEnumintensity_levelsFieldUpdateOperationsInput | intensity_levels | null
    owner_id?: StringFieldUpdateOperationsInput | string
    is_public?: BoolFieldUpdateOperationsInput | boolean
    workout_schema?: workout_schemaUncheckedUpdateManyWithoutWorkoutInput
  }

  export type superset_workout_instanceUpsertWithWhereUniqueWithoutSuperset_workout_schemaInput = {
    where: superset_workout_instanceWhereUniqueInput
    update: XOR<superset_workout_instanceUpdateWithoutSuperset_workout_schemaInput, superset_workout_instanceUncheckedUpdateWithoutSuperset_workout_schemaInput>
    create: XOR<superset_workout_instanceCreateWithoutSuperset_workout_schemaInput, superset_workout_instanceUncheckedCreateWithoutSuperset_workout_schemaInput>
  }

  export type superset_workout_instanceUpdateWithWhereUniqueWithoutSuperset_workout_schemaInput = {
    where: superset_workout_instanceWhereUniqueInput
    data: XOR<superset_workout_instanceUpdateWithoutSuperset_workout_schemaInput, superset_workout_instanceUncheckedUpdateWithoutSuperset_workout_schemaInput>
  }

  export type superset_workout_instanceUpdateManyWithWhereWithoutSuperset_workout_schemaInput = {
    where: superset_workout_instanceScalarWhereInput
    data: XOR<superset_workout_instanceUpdateManyMutationInput, superset_workout_instanceUncheckedUpdateManyWithoutSuperset_workout_instanceInput>
  }

  export type superset_workout_instanceScalarWhereInput = {
    AND?: Enumerable<superset_workout_instanceScalarWhereInput>
    OR?: Enumerable<superset_workout_instanceScalarWhereInput>
    NOT?: Enumerable<superset_workout_instanceScalarWhereInput>
    superset_workout_schema_id?: StringFilter | string
    session_instance_id?: StringFilter | string
    sets_data?: JsonFilter
  }

  export type session_schemaCreateWithoutSession_instanceInput = {
    id: string
    name: string
    owner: userCreateNestedOneWithoutSession_schemaInput
    workout_schema?: workout_schemaCreateNestedManyWithoutSession_schemaInput
    superset_schema?: superset_schemaCreateNestedManyWithoutSession_schemaInput
  }

  export type session_schemaUncheckedCreateWithoutSession_instanceInput = {
    id: string
    name: string
    owner_id: string
    workout_schema?: workout_schemaUncheckedCreateNestedManyWithoutSession_schemaInput
    superset_schema?: superset_schemaUncheckedCreateNestedManyWithoutSession_schemaInput
  }

  export type session_schemaCreateOrConnectWithoutSession_instanceInput = {
    where: session_schemaWhereUniqueInput
    create: XOR<session_schemaCreateWithoutSession_instanceInput, session_schemaUncheckedCreateWithoutSession_instanceInput>
  }

  export type workout_instanceCreateWithoutSession_instanceInput = {
    workout_schema: workout_schemaCreateNestedOneWithoutWorkout_instanceInput
    sets_data: JsonNullValueInput | InputJsonValue
  }

  export type workout_instanceUncheckedCreateWithoutSession_instanceInput = {
    workout_schema_id: string
    sets_data: JsonNullValueInput | InputJsonValue
  }

  export type workout_instanceCreateOrConnectWithoutSession_instanceInput = {
    where: workout_instanceWhereUniqueInput
    create: XOR<workout_instanceCreateWithoutSession_instanceInput, workout_instanceUncheckedCreateWithoutSession_instanceInput>
  }

  export type workout_instanceCreateManySession_instanceInputEnvelope = {
    data: Enumerable<workout_instanceCreateManySession_instanceInput>
    skipDuplicates?: boolean
  }

  export type superset_workout_instanceCreateWithoutSession_instanceInput = {
    superset_workout_schema: superset_workout_schemaCreateNestedOneWithoutSuperset_workout_instanceInput
    sets_data: JsonNullValueInput | InputJsonValue
  }

  export type superset_workout_instanceUncheckedCreateWithoutSession_instanceInput = {
    superset_workout_schema_id: string
    sets_data: JsonNullValueInput | InputJsonValue
  }

  export type superset_workout_instanceCreateOrConnectWithoutSession_instanceInput = {
    where: superset_workout_instanceWhereUniqueInput
    create: XOR<superset_workout_instanceCreateWithoutSession_instanceInput, superset_workout_instanceUncheckedCreateWithoutSession_instanceInput>
  }

  export type superset_workout_instanceCreateManySession_instanceInputEnvelope = {
    data: Enumerable<superset_workout_instanceCreateManySession_instanceInput>
    skipDuplicates?: boolean
  }

  export type session_schemaUpsertWithoutSession_instanceInput = {
    update: XOR<session_schemaUpdateWithoutSession_instanceInput, session_schemaUncheckedUpdateWithoutSession_instanceInput>
    create: XOR<session_schemaCreateWithoutSession_instanceInput, session_schemaUncheckedCreateWithoutSession_instanceInput>
  }

  export type session_schemaUpdateWithoutSession_instanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    owner?: userUpdateOneRequiredWithoutSession_schemaInput
    workout_schema?: workout_schemaUpdateManyWithoutSession_schemaInput
    superset_schema?: superset_schemaUpdateManyWithoutSession_schemaInput
  }

  export type session_schemaUncheckedUpdateWithoutSession_instanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    owner_id?: StringFieldUpdateOperationsInput | string
    workout_schema?: workout_schemaUncheckedUpdateManyWithoutSession_schemaInput
    superset_schema?: superset_schemaUncheckedUpdateManyWithoutSession_schemaInput
  }

  export type workout_instanceUpsertWithWhereUniqueWithoutSession_instanceInput = {
    where: workout_instanceWhereUniqueInput
    update: XOR<workout_instanceUpdateWithoutSession_instanceInput, workout_instanceUncheckedUpdateWithoutSession_instanceInput>
    create: XOR<workout_instanceCreateWithoutSession_instanceInput, workout_instanceUncheckedCreateWithoutSession_instanceInput>
  }

  export type workout_instanceUpdateWithWhereUniqueWithoutSession_instanceInput = {
    where: workout_instanceWhereUniqueInput
    data: XOR<workout_instanceUpdateWithoutSession_instanceInput, workout_instanceUncheckedUpdateWithoutSession_instanceInput>
  }

  export type workout_instanceUpdateManyWithWhereWithoutSession_instanceInput = {
    where: workout_instanceScalarWhereInput
    data: XOR<workout_instanceUpdateManyMutationInput, workout_instanceUncheckedUpdateManyWithoutWorkout_instanceInput>
  }

  export type superset_workout_instanceUpsertWithWhereUniqueWithoutSession_instanceInput = {
    where: superset_workout_instanceWhereUniqueInput
    update: XOR<superset_workout_instanceUpdateWithoutSession_instanceInput, superset_workout_instanceUncheckedUpdateWithoutSession_instanceInput>
    create: XOR<superset_workout_instanceCreateWithoutSession_instanceInput, superset_workout_instanceUncheckedCreateWithoutSession_instanceInput>
  }

  export type superset_workout_instanceUpdateWithWhereUniqueWithoutSession_instanceInput = {
    where: superset_workout_instanceWhereUniqueInput
    data: XOR<superset_workout_instanceUpdateWithoutSession_instanceInput, superset_workout_instanceUncheckedUpdateWithoutSession_instanceInput>
  }

  export type superset_workout_instanceUpdateManyWithWhereWithoutSession_instanceInput = {
    where: superset_workout_instanceScalarWhereInput
    data: XOR<superset_workout_instanceUpdateManyMutationInput, superset_workout_instanceUncheckedUpdateManyWithoutSuperset_workout_instanceInput>
  }

  export type workout_schemaCreateWithoutWorkout_instanceInput = {
    id: string
    session_schema: session_schemaCreateNestedOneWithoutWorkout_schemaInput
    workout: workoutCreateNestedOneWithoutWorkout_schemaInput
    default_target: JsonNullValueInput | InputJsonValue
    order?: number
  }

  export type workout_schemaUncheckedCreateWithoutWorkout_instanceInput = {
    id: string
    session_schema_id: string
    workout_id: string
    default_target: JsonNullValueInput | InputJsonValue
    order?: number
  }

  export type workout_schemaCreateOrConnectWithoutWorkout_instanceInput = {
    where: workout_schemaWhereUniqueInput
    create: XOR<workout_schemaCreateWithoutWorkout_instanceInput, workout_schemaUncheckedCreateWithoutWorkout_instanceInput>
  }

  export type session_instanceCreateWithoutWorkout_instanceInput = {
    id: string
    session_schema: session_schemaCreateNestedOneWithoutSession_instanceInput
    start_timestamp?: Date | string
    end_timestamp?: Date | string | null
    superset_workout_instance?: superset_workout_instanceCreateNestedManyWithoutSession_instanceInput
  }

  export type session_instanceUncheckedCreateWithoutWorkout_instanceInput = {
    id: string
    session_schema_id: string
    start_timestamp?: Date | string
    end_timestamp?: Date | string | null
    superset_workout_instance?: superset_workout_instanceUncheckedCreateNestedManyWithoutSession_instanceInput
  }

  export type session_instanceCreateOrConnectWithoutWorkout_instanceInput = {
    where: session_instanceWhereUniqueInput
    create: XOR<session_instanceCreateWithoutWorkout_instanceInput, session_instanceUncheckedCreateWithoutWorkout_instanceInput>
  }

  export type workout_schemaUpsertWithoutWorkout_instanceInput = {
    update: XOR<workout_schemaUpdateWithoutWorkout_instanceInput, workout_schemaUncheckedUpdateWithoutWorkout_instanceInput>
    create: XOR<workout_schemaCreateWithoutWorkout_instanceInput, workout_schemaUncheckedCreateWithoutWorkout_instanceInput>
  }

  export type workout_schemaUpdateWithoutWorkout_instanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    session_schema?: session_schemaUpdateOneRequiredWithoutWorkout_schemaInput
    workout?: workoutUpdateOneRequiredWithoutWorkout_schemaInput
    default_target?: JsonNullValueInput | InputJsonValue
    order?: IntFieldUpdateOperationsInput | number
  }

  export type workout_schemaUncheckedUpdateWithoutWorkout_instanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    session_schema_id?: StringFieldUpdateOperationsInput | string
    workout_id?: StringFieldUpdateOperationsInput | string
    default_target?: JsonNullValueInput | InputJsonValue
    order?: IntFieldUpdateOperationsInput | number
  }

  export type session_instanceUpsertWithoutWorkout_instanceInput = {
    update: XOR<session_instanceUpdateWithoutWorkout_instanceInput, session_instanceUncheckedUpdateWithoutWorkout_instanceInput>
    create: XOR<session_instanceCreateWithoutWorkout_instanceInput, session_instanceUncheckedCreateWithoutWorkout_instanceInput>
  }

  export type session_instanceUpdateWithoutWorkout_instanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    session_schema?: session_schemaUpdateOneRequiredWithoutSession_instanceInput
    start_timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    end_timestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    superset_workout_instance?: superset_workout_instanceUpdateManyWithoutSession_instanceInput
  }

  export type session_instanceUncheckedUpdateWithoutWorkout_instanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    session_schema_id?: StringFieldUpdateOperationsInput | string
    start_timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    end_timestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    superset_workout_instance?: superset_workout_instanceUncheckedUpdateManyWithoutSession_instanceInput
  }

  export type superset_workout_schemaCreateWithoutSuperset_workout_instanceInput = {
    id: string
    superset_schema: superset_schemaCreateNestedOneWithoutSuperset_workout_schemaInput
    workout: workoutCreateNestedOneWithoutSuperset_workout_schemaInput
    default_target: JsonNullValueInput | InputJsonValue
    order?: number
  }

  export type superset_workout_schemaUncheckedCreateWithoutSuperset_workout_instanceInput = {
    id: string
    superset_schema_id: string
    workout_id: string
    default_target: JsonNullValueInput | InputJsonValue
    order?: number
  }

  export type superset_workout_schemaCreateOrConnectWithoutSuperset_workout_instanceInput = {
    where: superset_workout_schemaWhereUniqueInput
    create: XOR<superset_workout_schemaCreateWithoutSuperset_workout_instanceInput, superset_workout_schemaUncheckedCreateWithoutSuperset_workout_instanceInput>
  }

  export type session_instanceCreateWithoutSuperset_workout_instanceInput = {
    id: string
    session_schema: session_schemaCreateNestedOneWithoutSession_instanceInput
    start_timestamp?: Date | string
    end_timestamp?: Date | string | null
    workout_instance?: workout_instanceCreateNestedManyWithoutSession_instanceInput
  }

  export type session_instanceUncheckedCreateWithoutSuperset_workout_instanceInput = {
    id: string
    session_schema_id: string
    start_timestamp?: Date | string
    end_timestamp?: Date | string | null
    workout_instance?: workout_instanceUncheckedCreateNestedManyWithoutSession_instanceInput
  }

  export type session_instanceCreateOrConnectWithoutSuperset_workout_instanceInput = {
    where: session_instanceWhereUniqueInput
    create: XOR<session_instanceCreateWithoutSuperset_workout_instanceInput, session_instanceUncheckedCreateWithoutSuperset_workout_instanceInput>
  }

  export type superset_workout_schemaUpsertWithoutSuperset_workout_instanceInput = {
    update: XOR<superset_workout_schemaUpdateWithoutSuperset_workout_instanceInput, superset_workout_schemaUncheckedUpdateWithoutSuperset_workout_instanceInput>
    create: XOR<superset_workout_schemaCreateWithoutSuperset_workout_instanceInput, superset_workout_schemaUncheckedCreateWithoutSuperset_workout_instanceInput>
  }

  export type superset_workout_schemaUpdateWithoutSuperset_workout_instanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    superset_schema?: superset_schemaUpdateOneRequiredWithoutSuperset_workout_schemaInput
    workout?: workoutUpdateOneRequiredWithoutSuperset_workout_schemaInput
    default_target?: JsonNullValueInput | InputJsonValue
    order?: IntFieldUpdateOperationsInput | number
  }

  export type superset_workout_schemaUncheckedUpdateWithoutSuperset_workout_instanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    superset_schema_id?: StringFieldUpdateOperationsInput | string
    workout_id?: StringFieldUpdateOperationsInput | string
    default_target?: JsonNullValueInput | InputJsonValue
    order?: IntFieldUpdateOperationsInput | number
  }

  export type session_instanceUpsertWithoutSuperset_workout_instanceInput = {
    update: XOR<session_instanceUpdateWithoutSuperset_workout_instanceInput, session_instanceUncheckedUpdateWithoutSuperset_workout_instanceInput>
    create: XOR<session_instanceCreateWithoutSuperset_workout_instanceInput, session_instanceUncheckedCreateWithoutSuperset_workout_instanceInput>
  }

  export type session_instanceUpdateWithoutSuperset_workout_instanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    session_schema?: session_schemaUpdateOneRequiredWithoutSession_instanceInput
    start_timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    end_timestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    workout_instance?: workout_instanceUpdateManyWithoutSession_instanceInput
  }

  export type session_instanceUncheckedUpdateWithoutSuperset_workout_instanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    session_schema_id?: StringFieldUpdateOperationsInput | string
    start_timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    end_timestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    workout_instance?: workout_instanceUncheckedUpdateManyWithoutSession_instanceInput
  }

  export type workoutCreateManyOwnerInput = {
    id: string
    name: string
    category: workout_type
    target_body_part?: body_part | null
    intensity?: intensity_levels | null
    is_public?: boolean
  }

  export type session_schemaCreateManyOwnerInput = {
    id: string
    name: string
  }

  export type workoutUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: Enumworkout_typeFieldUpdateOperationsInput | workout_type
    target_body_part?: NullableEnumbody_partFieldUpdateOperationsInput | body_part | null
    intensity?: NullableEnumintensity_levelsFieldUpdateOperationsInput | intensity_levels | null
    is_public?: BoolFieldUpdateOperationsInput | boolean
    workout_schema?: workout_schemaUpdateManyWithoutWorkoutInput
    superset_workout_schema?: superset_workout_schemaUpdateManyWithoutWorkoutInput
  }

  export type workoutUncheckedUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: Enumworkout_typeFieldUpdateOperationsInput | workout_type
    target_body_part?: NullableEnumbody_partFieldUpdateOperationsInput | body_part | null
    intensity?: NullableEnumintensity_levelsFieldUpdateOperationsInput | intensity_levels | null
    is_public?: BoolFieldUpdateOperationsInput | boolean
    workout_schema?: workout_schemaUncheckedUpdateManyWithoutWorkoutInput
    superset_workout_schema?: superset_workout_schemaUncheckedUpdateManyWithoutWorkoutInput
  }

  export type workoutUncheckedUpdateManyWithoutWorkoutInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: Enumworkout_typeFieldUpdateOperationsInput | workout_type
    target_body_part?: NullableEnumbody_partFieldUpdateOperationsInput | body_part | null
    intensity?: NullableEnumintensity_levelsFieldUpdateOperationsInput | intensity_levels | null
    is_public?: BoolFieldUpdateOperationsInput | boolean
  }

  export type session_schemaUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    workout_schema?: workout_schemaUpdateManyWithoutSession_schemaInput
    superset_schema?: superset_schemaUpdateManyWithoutSession_schemaInput
    session_instance?: session_instanceUpdateManyWithoutSession_schemaInput
  }

  export type session_schemaUncheckedUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    workout_schema?: workout_schemaUncheckedUpdateManyWithoutSession_schemaInput
    superset_schema?: superset_schemaUncheckedUpdateManyWithoutSession_schemaInput
    session_instance?: session_instanceUncheckedUpdateManyWithoutSession_schemaInput
  }

  export type session_schemaUncheckedUpdateManyWithoutSession_schemaInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type workout_schemaCreateManyWorkoutInput = {
    id: string
    session_schema_id: string
    default_target: JsonNullValueInput | InputJsonValue
    order?: number
  }

  export type superset_workout_schemaCreateManyWorkoutInput = {
    id: string
    superset_schema_id: string
    default_target: JsonNullValueInput | InputJsonValue
    order?: number
  }

  export type workout_schemaUpdateWithoutWorkoutInput = {
    id?: StringFieldUpdateOperationsInput | string
    session_schema?: session_schemaUpdateOneRequiredWithoutWorkout_schemaInput
    default_target?: JsonNullValueInput | InputJsonValue
    order?: IntFieldUpdateOperationsInput | number
    workout_instance?: workout_instanceUpdateManyWithoutWorkout_schemaInput
  }

  export type workout_schemaUncheckedUpdateWithoutWorkoutInput = {
    id?: StringFieldUpdateOperationsInput | string
    session_schema_id?: StringFieldUpdateOperationsInput | string
    default_target?: JsonNullValueInput | InputJsonValue
    order?: IntFieldUpdateOperationsInput | number
    workout_instance?: workout_instanceUncheckedUpdateManyWithoutWorkout_schemaInput
  }

  export type workout_schemaUncheckedUpdateManyWithoutWorkout_schemaInput = {
    id?: StringFieldUpdateOperationsInput | string
    session_schema_id?: StringFieldUpdateOperationsInput | string
    default_target?: JsonNullValueInput | InputJsonValue
    order?: IntFieldUpdateOperationsInput | number
  }

  export type superset_workout_schemaUpdateWithoutWorkoutInput = {
    id?: StringFieldUpdateOperationsInput | string
    superset_schema?: superset_schemaUpdateOneRequiredWithoutSuperset_workout_schemaInput
    default_target?: JsonNullValueInput | InputJsonValue
    order?: IntFieldUpdateOperationsInput | number
    superset_workout_instance?: superset_workout_instanceUpdateManyWithoutSuperset_workout_schemaInput
  }

  export type superset_workout_schemaUncheckedUpdateWithoutWorkoutInput = {
    id?: StringFieldUpdateOperationsInput | string
    superset_schema_id?: StringFieldUpdateOperationsInput | string
    default_target?: JsonNullValueInput | InputJsonValue
    order?: IntFieldUpdateOperationsInput | number
    superset_workout_instance?: superset_workout_instanceUncheckedUpdateManyWithoutSuperset_workout_schemaInput
  }

  export type superset_workout_schemaUncheckedUpdateManyWithoutSuperset_workout_schemaInput = {
    id?: StringFieldUpdateOperationsInput | string
    superset_schema_id?: StringFieldUpdateOperationsInput | string
    default_target?: JsonNullValueInput | InputJsonValue
    order?: IntFieldUpdateOperationsInput | number
  }

  export type workout_schemaCreateManySession_schemaInput = {
    id: string
    workout_id: string
    default_target: JsonNullValueInput | InputJsonValue
    order?: number
  }

  export type superset_schemaCreateManySession_schemaInput = {
    id: string
    name: string
  }

  export type session_instanceCreateManySession_schemaInput = {
    id: string
    start_timestamp?: Date | string
    end_timestamp?: Date | string | null
  }

  export type workout_schemaUpdateWithoutSession_schemaInput = {
    id?: StringFieldUpdateOperationsInput | string
    workout?: workoutUpdateOneRequiredWithoutWorkout_schemaInput
    default_target?: JsonNullValueInput | InputJsonValue
    order?: IntFieldUpdateOperationsInput | number
    workout_instance?: workout_instanceUpdateManyWithoutWorkout_schemaInput
  }

  export type workout_schemaUncheckedUpdateWithoutSession_schemaInput = {
    id?: StringFieldUpdateOperationsInput | string
    workout_id?: StringFieldUpdateOperationsInput | string
    default_target?: JsonNullValueInput | InputJsonValue
    order?: IntFieldUpdateOperationsInput | number
    workout_instance?: workout_instanceUncheckedUpdateManyWithoutWorkout_schemaInput
  }

  export type superset_schemaUpdateWithoutSession_schemaInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    superset_workout_schema?: superset_workout_schemaUpdateManyWithoutSuperset_schemaInput
  }

  export type superset_schemaUncheckedUpdateWithoutSession_schemaInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    superset_workout_schema?: superset_workout_schemaUncheckedUpdateManyWithoutSuperset_schemaInput
  }

  export type superset_schemaUncheckedUpdateManyWithoutSuperset_schemaInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type session_instanceUpdateWithoutSession_schemaInput = {
    id?: StringFieldUpdateOperationsInput | string
    start_timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    end_timestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    workout_instance?: workout_instanceUpdateManyWithoutSession_instanceInput
    superset_workout_instance?: superset_workout_instanceUpdateManyWithoutSession_instanceInput
  }

  export type session_instanceUncheckedUpdateWithoutSession_schemaInput = {
    id?: StringFieldUpdateOperationsInput | string
    start_timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    end_timestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    workout_instance?: workout_instanceUncheckedUpdateManyWithoutSession_instanceInput
    superset_workout_instance?: superset_workout_instanceUncheckedUpdateManyWithoutSession_instanceInput
  }

  export type session_instanceUncheckedUpdateManyWithoutSession_instanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    start_timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    end_timestamp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type workout_instanceCreateManyWorkout_schemaInput = {
    session_instance_id: string
    sets_data: JsonNullValueInput | InputJsonValue
  }

  export type workout_instanceUpdateWithoutWorkout_schemaInput = {
    session_instance?: session_instanceUpdateOneRequiredWithoutWorkout_instanceInput
    sets_data?: JsonNullValueInput | InputJsonValue
  }

  export type workout_instanceUncheckedUpdateWithoutWorkout_schemaInput = {
    session_instance_id?: StringFieldUpdateOperationsInput | string
    sets_data?: JsonNullValueInput | InputJsonValue
  }

  export type workout_instanceUncheckedUpdateManyWithoutWorkout_instanceInput = {
    session_instance_id?: StringFieldUpdateOperationsInput | string
    sets_data?: JsonNullValueInput | InputJsonValue
  }

  export type superset_workout_schemaCreateManySuperset_schemaInput = {
    id: string
    workout_id: string
    default_target: JsonNullValueInput | InputJsonValue
    order?: number
  }

  export type superset_workout_schemaUpdateWithoutSuperset_schemaInput = {
    id?: StringFieldUpdateOperationsInput | string
    workout?: workoutUpdateOneRequiredWithoutSuperset_workout_schemaInput
    default_target?: JsonNullValueInput | InputJsonValue
    order?: IntFieldUpdateOperationsInput | number
    superset_workout_instance?: superset_workout_instanceUpdateManyWithoutSuperset_workout_schemaInput
  }

  export type superset_workout_schemaUncheckedUpdateWithoutSuperset_schemaInput = {
    id?: StringFieldUpdateOperationsInput | string
    workout_id?: StringFieldUpdateOperationsInput | string
    default_target?: JsonNullValueInput | InputJsonValue
    order?: IntFieldUpdateOperationsInput | number
    superset_workout_instance?: superset_workout_instanceUncheckedUpdateManyWithoutSuperset_workout_schemaInput
  }

  export type superset_workout_instanceCreateManySuperset_workout_schemaInput = {
    session_instance_id: string
    sets_data: JsonNullValueInput | InputJsonValue
  }

  export type superset_workout_instanceUpdateWithoutSuperset_workout_schemaInput = {
    session_instance?: session_instanceUpdateOneRequiredWithoutSuperset_workout_instanceInput
    sets_data?: JsonNullValueInput | InputJsonValue
  }

  export type superset_workout_instanceUncheckedUpdateWithoutSuperset_workout_schemaInput = {
    session_instance_id?: StringFieldUpdateOperationsInput | string
    sets_data?: JsonNullValueInput | InputJsonValue
  }

  export type superset_workout_instanceUncheckedUpdateManyWithoutSuperset_workout_instanceInput = {
    session_instance_id?: StringFieldUpdateOperationsInput | string
    sets_data?: JsonNullValueInput | InputJsonValue
  }

  export type workout_instanceCreateManySession_instanceInput = {
    workout_schema_id: string
    sets_data: JsonNullValueInput | InputJsonValue
  }

  export type superset_workout_instanceCreateManySession_instanceInput = {
    superset_workout_schema_id: string
    sets_data: JsonNullValueInput | InputJsonValue
  }

  export type workout_instanceUpdateWithoutSession_instanceInput = {
    workout_schema?: workout_schemaUpdateOneRequiredWithoutWorkout_instanceInput
    sets_data?: JsonNullValueInput | InputJsonValue
  }

  export type workout_instanceUncheckedUpdateWithoutSession_instanceInput = {
    workout_schema_id?: StringFieldUpdateOperationsInput | string
    sets_data?: JsonNullValueInput | InputJsonValue
  }

  export type superset_workout_instanceUpdateWithoutSession_instanceInput = {
    superset_workout_schema?: superset_workout_schemaUpdateOneRequiredWithoutSuperset_workout_instanceInput
    sets_data?: JsonNullValueInput | InputJsonValue
  }

  export type superset_workout_instanceUncheckedUpdateWithoutSession_instanceInput = {
    superset_workout_schema_id?: StringFieldUpdateOperationsInput | string
    sets_data?: JsonNullValueInput | InputJsonValue
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.DMMF.Document;
}
