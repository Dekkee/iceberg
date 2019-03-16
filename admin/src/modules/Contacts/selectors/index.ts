import { EntityState } from '../../../reducers/common';
import { ContactsExtended } from '../../../../../common/contracts/Contacts';
import { moduleName } from '..';

export const selector = (state: any): EntityState<ContactsExtended> => state[ moduleName ];
