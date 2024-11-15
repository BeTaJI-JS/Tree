import { Node } from 'types/index';
import { setUniqId } from 'utils/index';

export const data: Node[] = [
  {
    id: setUniqId(),
    name: 'КорневаяПапка1',
    type: 'folder',
    children: [
      {
        id: setUniqId(),
        name: 'Подпапка1.1',
        type: 'folder',
        children: [
          { id: setUniqId(), name: 'файл1.txt', type: 'file' },
          { id: setUniqId(), name: 'файл2.png', type: 'file' },
          { id: setUniqId(), name: 'файл3.doc', type: 'file' },
        ],
      },
      {
        id: setUniqId(),
        name: 'Подпапка1.2',
        type: 'folder',
        children: [
          { id: setUniqId(), name: 'файл4.img', type: 'file' },
          { id: setUniqId(), name: 'файл5.ppt', type: 'file' },
          { id: setUniqId(), name: 'файл6.txt', type: 'file' },
        ],
      },
    ],
  },
];
