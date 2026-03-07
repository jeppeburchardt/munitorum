'use strict'

import React, {
  Component
} from 'react'
import PropTypes from 'prop-types'
import component from '../../component'
import { Trans } from 'react-i18next'
import IconButton from '@material-ui/core/IconButton'
import DownIcon from '@material-ui/icons/ArrowDownward'
import UpIcon from '@material-ui/icons/ArrowUpward'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import RemoveIcon from '@material-ui/icons/Remove'
import Typography from '@material-ui/core/Typography'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import MoreIcon from '@material-ui/icons/ExpandMore'
import Hidden from '@material-ui/core/Hidden'
import InlineButton from '../../inline-button'
import Confirm from '../../confirm'
import PopOverMenu from '../../pop-over-menu'
import Tooltip from '@material-ui/core/Tooltip'
import {
  MultipleChoiceWeapon
} from '../../../rules/netea-30k/weapons'
import {
  PricingQuality
} from '../../../rules/netea-30k/special-rules'
import {
  removeUnit,
  updateUnit,
  moveUnitUp,
  moveUnitDown
} from '../../../store/actions'
import EditableMultiChoiceWeapon from './edit-multiple-choice-weapon'

const qualityColors = {
  Safe: '#4caf50',
  Review: '#ff9800',
  Experimental: '#f44336',
  Legacy: '#9e9e9e'
}

const qualityTooltip = (
  <span>
    <strong style={{ color: '#4caf50' }}>&#9679; Safe</strong> — Pricing verified with sufficient match data; considered accurate.<br />
    <strong style={{ color: '#ff9800' }}>&#9679; Review</strong> — Needs more data; may not reflect true competitive value.<br />
    <strong style={{ color: '#f44336' }}>&#9679; Experimental</strong> — Very limited data; highly uncertain, subject to significant change.<br />
    <strong style={{ color: '#9e9e9e' }}>&#9679; Legacy</strong> — No pricing data available; cost is based on legacy values not in the dataset.
  </span>
)

const EditableWeaponDisplay = component(({ name, t }) => {
  return (
    <Typography component='p' variant='subtitle2' color='textSecondary'>
      {t(name)}
    </Typography>
  )
})

const IncreaseQuantity = component(({ quantity, min, max, onIncreaseQuantity }) => {
  if (max === undefined) {
    return null
  }

  return (
    <InlineButton size='small' disabled={quantity === max} onClick={onIncreaseQuantity}>
      <AddIcon />
    </InlineButton>
  )
})

const DecreaseQuantity = component(({ quantity, min, max, onDecreaseQuantity }) => {
  if (max === undefined) {
    return null
  }

  return (
    <InlineButton size='small' disabled={quantity === min} onClick={onDecreaseQuantity}>
      <RemoveIcon />
    </InlineButton>
  )
})

const NameDisplay = component(({ name, quantity, min, max, unitOptions, onIncreaseQuantity, onDecreaseQuantity, onChooseUnitOption, t }) => {
  const type = t(name)

  let nameDisplay = (
    <Trans i18nKey='unit-quantity'>{{ quantity }}x {{ type }}</Trans>
  )

  if (isNaN(quantity) || (quantity === 1 && !max)) {
    nameDisplay = type
  }

  nameDisplay = (
    <>
      {nameDisplay}
      <IncreaseQuantity
        quantity={quantity}
        min={min}
        max={max}
        onIncreaseQuantity={onIncreaseQuantity}
      />
      <DecreaseQuantity
        quantity={quantity}
        min={min}
        max={max}
        onDecreaseQuantity={onDecreaseQuantity}
      />
    </>
  )

  if (unitOptions) {
    return (
      <PopOverMenu
        text={nameDisplay}
        textComponent='p'
        textVariant='subtitle1'
        items={unitOptions}
        onSelect={onChooseUnitOption}
        button={<MoreIcon fontSize='small' />}
        buttonSize='small'
      />
    )
  }

  return (
    <Typography component='p' variant='subtitle1'>
      {nameDisplay}
    </Typography>
  )
})

const CostDisplay = component(({ cost, rules, classes, t }) => {
  const qualityRule = rules && rules.find(rule => rule instanceof PricingQuality)

  if (!cost) {
    return t('free')
  } else {
    const asInt = parseInt(cost)

    if (cost !== asInt) {
      cost = parseFloat(cost).toFixed(1)
    }

    return (
      <>
        {qualityRule && (
          <Tooltip title={qualityTooltip} placement='top'>
            <span className={classes.qualityIndicator}>
              <span className={classes.qualityOrb} style={{ backgroundColor: qualityColors[qualityRule.type] || '#9e9e9e' }} />
              <Trans i18nKey='cost'>{{ cost }} pts</Trans>
            </span>
          </Tooltip>
        )}
      </>
    )
  }
})

class UnitEditor extends Component {
  static propTypes = {
    unit: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    cost: PropTypes.number.isRequired,
    weapons: PropTypes.array.isRequired,
    mandatory: PropTypes.bool
  }

  handleRemoveUnit = () => {
    const {
      detachment,
      unit,
      removeUnit
    } = this.props

    removeUnit({
      detachment,
      unit
    })
  }

  handleIncreaseQuantity = () => {
    const {
      unit,
      updateUnit
    } = this.props

    updateUnit({
      unit,
      operation: (unit) => {
        unit.increaseQuantity()
      }
    })
  }

  handleDecreaseQuantity = () => {
    const {
      unit,
      updateUnit
    } = this.props

    updateUnit({
      unit,
      operation: (unit) => {
        unit.decreaseQuantity()
      }
    })
  }

  handleChooseUnitOption = ({ code }) => {
    const {
      unit,
      unitOptions,
      updateUnit
    } = this.props

    const choice = unitOptions.findIndex(item => item.code === code)

    updateUnit({
      unit,
      operation: (unit) => {
        unit.setUnitOption(choice)
      }
    })
  }

  handleMoveUp = () => {
    const {
      moveUnitUp,
      unit
    } = this.props

    moveUnitUp(unit)
  }

  handleMoveDown = () => {
    const {
      moveUnitDown,
      unit
    } = this.props

    moveUnitDown(unit)
  }

  render() {
    const {
      name,
      quantity,
      min,
      max,
      cost,
      rules,
      weapons,
      mandatory,
      unitOptions,
      classes,
      unit,
      t,
      isFirst,
      isLast
    } = this.props

    const details = (
      <>
        <NameDisplay
          name={name}
          quantity={quantity}
          min={min}
          max={max}
          unitOptions={unitOptions}
          onChooseUnitOption={this.handleChooseUnitOption}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
        />
        {
          weapons.map((weapon, weaponIndex) => {
            if (weapon instanceof MultipleChoiceWeapon) {
              return (
                <EditableMultiChoiceWeapon
                  key={`weapon-${weaponIndex}`}
                  unit={unit}
                  weapon={weapon}
                  weaponIndex={weaponIndex}
                />
              )
            }

            return (
              <EditableWeaponDisplay
                key={`weapon-${weaponIndex}`}
                name={weapon.name}
              />
            )
          })
        }
      </>
    )

    const costDisplay = (
      <CostDisplay cost={cost} rules={rules} className={classes.flexGrow} />
    )

    const moveUp = (
      <IconButton
        aria-label={t('move-up')}
        onClick={this.handleMoveUp}
        disabled={isFirst}
      >
        <UpIcon />
      </IconButton>
    )

    const moveDown = (
      <IconButton
        aria-label={t('move-down')}
        onClick={this.handleMoveDown}
        disabled={isLast}
      >
        <DownIcon />
      </IconButton>
    )

    const remove = (
      <Confirm
        title='Remove this unit?' text='Really remove this unit?' onConfirm={this.handleRemoveUnit} button={(onClick) => (
          <IconButton aria-label='Remove' onClick={onClick} disabled={mandatory}>
            <DeleteIcon />
          </IconButton>
        )}
      />
    )

    return (
      <>
        <TableRow>
          <TableCell className={classes.tableDetailsCell}>
            {details}
            <Hidden smUp>
              <div className={classes.flexContainer}>
                <p className={classes.grow}>
                  {costDisplay}
                </p>
                {moveUp}
                {moveDown}
                {remove}
              </div>
            </Hidden>
          </TableCell>
          <Hidden xsDown>
            <TableCell padding='checkbox' className={classes.tablePointsCell}>
              {costDisplay}
            </TableCell>
            <TableCell padding='checkbox' className={classes.tableIconCell}>
              {moveUp}
            </TableCell>
            <TableCell padding='checkbox' className={classes.tableIconCell}>
              {moveDown}
            </TableCell>
            <TableCell padding='checkbox' className={classes.tableIconCell}>
              {remove}
            </TableCell>
          </Hidden>
        </TableRow>
      </>
    )
  }
}

const mapStateToProps = (state, { unit }) => {
  return {
    detachment: unit.detachment,
    unit: unit,
    name: unit.getName(),
    quantity: unit.getQuantity(),
    min: unit.getMin(),
    max: unit.getMax(),
    cost: unit.getCost(),
    rules: unit.getRules(),
    weapons: unit.getWeapons(),
    mandatory: unit.getMandatory(),
    unitOptions: unit.getUnitOptions()
  }
}

const mapDispatchToProps = {
  removeUnit,
  updateUnit,
  moveUnitUp,
  moveUnitDown
}

export default component(UnitEditor, mapStateToProps, mapDispatchToProps)
