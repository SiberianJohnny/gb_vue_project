import { describe, expect, it } from '@jest/globals'
import { mount } from '@vue/test-utils'
import Calculator from '../pages/Calc'

describe('Calculator test inputs', () => {
  it('Test number1 input value', () => {
    const wrapper = mount(Calculator)
    const num1 = wrapper.find('input[name=number1]')
    num1.setValue('1')
    expect(wrapper.vm.number1).toBe(1)
  })

  it('Test number2 input value', () => {
    const wrapper = mount(Calculator)
    const num2 = wrapper.find('input[name=number2]')
    num2.setValue('2')
    expect(wrapper.vm.number2).toBe(2)
  })
})

describe('Calculator test operations', () => {
  it('Test method sum', () => {
    const wrapper = mount(Calculator)

    const num1 = wrapper.find('input[name=number1]')
    num1.setValue('1')

    const num2 = wrapper.find('input[name=number2]')
    num2.setValue('2')

    const btnSum = wrapper.find('button[name="+"]')
    btnSum.trigger('click')

    expect(wrapper.vm.result).toBe(3)
  })

  it('Test method subtraction', () => {
    const wrapper = mount(Calculator)

    const num1 = wrapper.find('input[name=number1]')
    num1.setValue('10')

    const num2 = wrapper.find('input[name=number2]')
    num2.setValue('1')

    const btnSub = wrapper.find('button[name="-"]')
    btnSub.trigger('click')

    expect(wrapper.vm.result).toBe(9)
  })

  it('Test method multi', () => {
    const wrapper = mount(Calculator)

    const num1 = wrapper.find('input[name=number1]')
    num1.setValue('10')

    const num2 = wrapper.find('input[name=number2]')
    num2.setValue('2')

    const btnMulti = wrapper.find('button[name="*"]')
    btnMulti.trigger('click')

    expect(wrapper.vm.result).toBe(20)
  })

  it('Test method division', () => {
    const wrapper = mount(Calculator)

    const num1 = wrapper.find('input[name=number1]')
    num1.setValue('10')

    const num2 = wrapper.find('input[name=number2]')
    num2.setValue('2')

    const btnDiv = wrapper.find('button[name="/"]')
    btnDiv.trigger('click')

    expect(wrapper.vm.result).toBe(5)
  })

  it('Test method exponentiation', () => {
    const wrapper = mount(Calculator)

    const num1 = wrapper.find('input[name=number1]')
    num1.setValue('10')

    const num2 = wrapper.find('input[name=number2]')
    num2.setValue('2')

    const btnExp = wrapper.find('button[name="Exponentiation"]')
    btnExp.trigger('click')

    expect(wrapper.vm.result).toBe(100)
  })

  it('Test method integer division', () => {
    const wrapper = mount(Calculator)

    const num1 = wrapper.find('input[name=number1]')
    num1.setValue('10')

    const num2 = wrapper.find('input[name=number2]')
    num2.setValue('3')

    const btnInt = wrapper.find('button[name="Integer Division"]')
    btnInt.trigger('click')

    expect(wrapper.vm.result).toBe(3)
  })
})

describe('Calculator test virtual keyboard', () => {
  it('Test number1 input value', () => {
    const wrapper = mount(Calculator)
    wrapper.setData({ keyboardRadio: 'number1' })
    expect(wrapper.vm.keyboardRadio).toBe('number1')

    const btn0 = wrapper.find('button[name="0"]')
    btn0.trigger('click')

    const btn1 = wrapper.find('button[name="1"]')
    btn1.trigger('click')

    const btn2 = wrapper.find('button[name="2"]')
    btn2.trigger('click')

    const btn3 = wrapper.find('button[name="3"]')
    btn3.trigger('click')

    const btn4 = wrapper.find('button[name="4"]')
    btn4.trigger('click')

    const btn5 = wrapper.find('button[name="5"]')
    btn5.trigger('click')

    const btn6 = wrapper.find('button[name="6"]')
    btn6.trigger('click')

    const btn7 = wrapper.find('button[name="7"]')
    btn7.trigger('click')

    const btn8 = wrapper.find('button[name="8"]')
    btn8.trigger('click')

    const btn9 = wrapper.find('button[name="9"]')
    btn9.trigger('click')

    expect(wrapper.vm.number1).toBe("0123456789")
  })

  it('Test number2 input value', () => {
    const wrapper = mount(Calculator)
    wrapper.setData({ keyboardRadio: 'number2' })
    expect(wrapper.vm.keyboardRadio).toBe('number2')

    const btn0 = wrapper.find('button[name="0"]')
    btn0.trigger('click')
    expect(wrapper.vm.number2).toBe("0")

    const btn1 = wrapper.find('button[name="1"]')
    btn1.trigger('click')
    expect(wrapper.vm.number2).toBe("01")

    const btn2 = wrapper.find('button[name="2"]')
    btn2.trigger('click')
    expect(wrapper.vm.number2).toBe("012")

    const btn3 = wrapper.find('button[name="3"]')
    btn3.trigger('click')
    expect(wrapper.vm.number2).toBe("0123")

    const btn4 = wrapper.find('button[name="4"]')
    btn4.trigger('click')
    expect(wrapper.vm.number2).toBe("01234")

    const btn5 = wrapper.find('button[name="5"]')
    btn5.trigger('click')
    expect(wrapper.vm.number2).toBe("012345")

    const btn6 = wrapper.find('button[name="6"]')
    btn6.trigger('click')
    expect(wrapper.vm.number2).toBe("0123456")

    const btn7 = wrapper.find('button[name="7"]')
    btn7.trigger('click')
    expect(wrapper.vm.number2).toBe("01234567")

    const btn8 = wrapper.find('button[name="8"]')
    btn8.trigger('click')
    expect(wrapper.vm.number2).toBe("012345678")

    const btn9 = wrapper.find('button[name="9"]')
    btn9.trigger('click')
    expect(wrapper.vm.number2).toBe("0123456789")
  })
})

describe('Calculator test virtual clear/backspace btns', () => {
  it('Test btns', () => {
    const wrapper = mount(Calculator)
    wrapper.setData({ keyboardRadio: 'number1' })
    const clearBtn = wrapper.find('button[name="clear-btn"]')
    const backspaceBtn = wrapper.find('button[name="backspace"]')
    const num1 = wrapper.find('input[name=number1]')
    const num2 = wrapper.find('input[name=number2]')
    num1.setValue('12345')
    num2.setValue('12345')

    backspaceBtn.trigger('click')
    expect(wrapper.vm.number1).toBe(1234)
    clearBtn.trigger('click')
    expect(wrapper.vm.number1).toBe('')


    wrapper.setData({ keyboardRadio: 'number2' })
    backspaceBtn.trigger('click')
    expect(wrapper.vm.number2).toBe(1234)
    clearBtn.trigger('click')
    expect(wrapper.vm.number2).toBe('')
  })
})