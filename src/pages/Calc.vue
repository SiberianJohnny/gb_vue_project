<template>
  <div class="calc">
    <input
      type="number"
      v-model.number="number1"
      name="number1"
      placeholder="Enter First Number"
    />
    <input
      type="number"
      v-model.number="number2"
      name="number2"
      placeholder="Enter Second Number"
    />
    <br />
    = {{ result }}
    <br />

    <div class="error" v-if="!!error">Ошибка: {{ error }}</div>

    <button
      class="operations"
      v-for="item in operations"
      :key="item"
      @click="calculate(item)"
      :title="item"
      :name="item"
    >
      {{ item }}
    </button>

    <br />
    <input class="keyboard__show" type="checkbox" v-model="keyboardCheckbox" />
    Virtual Keyboard
    <br />
    <div class="keyboard" v-show="keyboardCheckbox">
      <button
        v-for="item in keyboard"
        :key="item"
        @click="addKey(item)"
        :title="item"
        :name="item"
      >
        {{ item }}
      </button>
      <button @click="backspace" name="backspace">Backspace</button>
      <button @click="clear" name="clear-btn">Clear Input</button>
      <div class="keyboard__radio">
        <label class="keyboard__radiobutton">
          <input
            type="radio"
            value="number1"
            name="keyboard__radio"
            v-model="keyboardRadio"
          />
          <span>First number</span>
        </label>
        <label class="keyboard__radiobutton">
          <input
            type="radio"
            value="number2"
            name="keyboard__radio"
            v-model="keyboardRadio"
          />
          <span>Second number</span>
        </label>
      </div>
    </div>

    <div class="logs">
      Calculator History:
      <br />
      <div v-for="(log, id) in logs" :key="id">{{ log }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Calculator",
  data: () => ({
    number1: "",
    number2: "",
    result: "Result",
    error: "",
    operations: ["+", "-", "*", "/", "Exponentiation", "Integer Division"],
    keyboard: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    keyboardCheckbox: "",
    keyboardRadio: "number1",
    logs: {},
  }),
  methods: {
    calculate(operation) {
      this.error = "";
      switch (operation) {
        case "+":
          this.sum();
          break;
        case "-":
          this.subtraction();
          break;
        case "*":
          this.multi();
          break;
        case "/":
          this.division();
          break;
        case "Exponentiation":
          this.pow();
          break;
        case "Integer Division":
          this.int();
          break;
      }
      const key = Date.now();
      const value = `${this.number1} ${operation} ${this.number2} = ${this.result}`;
      this.$set(this.logs, key, value);
    },
    sum() {
      this.result = parseInt(this.number1) + parseInt(this.number2);
    },
    subtraction() {
      this.result = this.number1 - this.number2;
    },
    multi() {
      this.result = this.number1 * this.number2;
    },
    division() {
      if (this.number1 === 0 || this.number2 === 0) {
        this.error = "Я вам запрещаю делить на 0.";
      } else {
        this.result = this.number1 / this.number2;
      }
    },
    pow() {
      this.result = Math.pow(this.number1, this.number2);
    },
    int() {
      this.result = Math.floor(this.number1 / this.number2);
    },
    addKey(number) {
      if (this.keyboardRadio === "number1") {
        this.number1 += number;
      } else {
        this.number2 += number;
      }
    },
    clear() {
      if (this.keyboardRadio === "number1") {
        this.number1 = "";
      } else {
        this.number2 = "";
      }
    },
    backspace() {
      this[this.keyboardRadio] = +String(this[this.keyboardRadio]).slice(0, -1);
    },
  },
};
</script>

<style>
.keyboard__show {
  margin-top: 25px;
  margin-bottom: 15px;
}
.logs {
  margin-top: 15px;
}
</style>