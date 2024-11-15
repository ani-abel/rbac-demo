import { SetMetadata } from '@nestjs/common';
import { Actions, FeatureGroups, Features } from '../../utils/util.constant';

export interface RequiredRules {
  action: Actions;
  feature: Features;
  featureGroup: FeatureGroups;
}

export const CHECK_ABILITY = 'check_ability';

export const CheckAbilities = (...requirements: RequiredRules[]) =>
  SetMetadata(CHECK_ABILITY, requirements);
