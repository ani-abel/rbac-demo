export enum Actions {
  MANAGE = 'manage',
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  READ = 'read',
  APPROVE = 'approve',
  REJECT = 'reject',
}

export enum Features {
  ALL = 'all',
  USER_MANAGEMENT = 'user',
  CARD_REQUEST = 'card requests',
  COMMENT_MANAGEMENT = 'comment',
}

export enum FeatureGroups {
  USER = 'user',
  MAINTENANCE_REQUEST = 'card requests',
  COMMENT = 'comment',
}
