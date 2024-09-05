/*
 * Copyright 2023 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Entity, stringifyEntityRef } from '@backstage/catalog-model';
import { entityRouteParams } from '@backstage/plugin-catalog-react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import { Link } from 'react-router-dom';
import { entityRouteRef } from '@backstage/plugin-catalog-react';
import { useRouteRef } from '@backstage/core-plugin-api';
import { StarIcon } from '@backstage/core-components';
import { withStyles } from '@material-ui/core/styles';

type EntityListItemProps = {
  entity: Entity;
  onToggleStarredEntity: (entity: Entity) => void;
};

export const StarredEntityListItem = ({
  entity,
  onToggleStarredEntity,
}: EntityListItemProps) => {
  const catalogEntityRoute = useRouteRef(entityRouteRef);

  const FilledStar = withStyles(theme => ({
    root: {
      color: theme.palette.entityStarButton.color,
    },
  }))(StarIcon);

  return (
    <ListItem key={stringifyEntityRef(entity)}>
      <ListItemIcon>
        <Tooltip title="Remove from starred">
          <IconButton
            edge="end"
            aria-label="unstar"
            onClick={() => onToggleStarredEntity(entity)}
          >
            <FilledStar />
          </IconButton>
        </Tooltip>
      </ListItemIcon>
      <Link to={catalogEntityRoute(entityRouteParams(entity))}>
        <ListItemText primary={entity.metadata.title ?? entity.metadata.name} />
      </Link>
    </ListItem>
  );
};
