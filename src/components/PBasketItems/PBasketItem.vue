<script setup lang="ts">
import calculateTime from "../../utils/calculateTime";
import formatPrice from "../../utils/formatPrice";
import {
  selectCartItem,
  getIsSelectedCartItem,
  tableDetailStore,
  itemAbsolutePrice,
  itemAbsoluteQuantity,
  getProductPaidTotalFromPayments,
} from "../../store/table-detail";

import { ref } from "vue";
import router from "../../router";
import { onLongPress } from "@vueuse/core";

const longPress = ref(null);
const pressedItemId = ref(null);

const { type, item } = defineProps(["item", "type", "isBillingPage"]);

const handleClickItem = () => {
  if (type === "tables") {
    router.push("/tables/" + item.id);
  } else {
    let selectedCartItem = tableDetailStore.selectedCartItems[0];
    if (selectedCartItem && selectedCartItem.divideQuantity) {
      tableDetailStore.cart.find(
          (cartItem) => selectedCartItem.id == cartItem.id
      ).divideQuantity = 0;
    }
    if (itemAbsoluteQuantity(item) != 0) {
      selectCartItem(item);
    }
  }
};

const filteredOptions = (feature) => {
  return feature.options.filter((option) =>
      feature.selected.includes(option.id)
  );
};

onLongPress(
    longPress,
    (e) => {
      tableDetailStore.cart.find(
          (cartItem) => pressedItemId.value == cartItem.id
      ).exclude = 0;
    },
    {
      modifiers: {
        prevent: true,
      },
      delay: 500,
    }
);
</script>

<template>
  <div
      @click="handleClickItem"
      :class="['basket-items-row-item cursor-pointer  align-items-start',
      {
      'item-selected': getIsSelectedCartItem(item.id),
      },
      {
      'opacity-50': itemAbsoluteQuantity(item) == 0,
      },
    ]">

    <div class="justify-content-between align-items-center w-100">
      <div class="basket-item-left">
        <h6 class="basket-item-quantity" v-if="type !== 'tables'">
          {{ itemAbsoluteQuantity(item) == 0 ? 1 : itemAbsoluteQuantity(item)  }}x
        </h6>

        <h6 v-if="item.divideQuantity" class="basket-item-divide-quantity">
          ({{ item.divideQuantity }})
        </h6>

        <div class="basket-item-label d-flex flex-column gap-0">
          <div class="d-flex justify-content-start align-items-center gap-2">
            <span class="basket-item-print" v-if="type === 'tables'"
            >{{ item.orders[0]?.printed }}
            </span>
            {{ item.name }}
          </div>
        </div>
      </div>

      <div class="basket-item-right">
        <div class="basket-item-price">
          {{
            type === "tables"
                ? formatPrice(item.amount)
                : itemAbsoluteQuantity(item) == 0
                    ? formatPrice(itemAbsolutePrice(item, true))
                    : formatPrice(itemAbsolutePrice(item))
          }}
        </div>
      </div>
    </div>
    <div class="row w-100 g-0">
      <div class="col-6">
        <div class="badge ps-2 text-dark text-start w-100">
          <div class="mb-2" v-if="item.portion == '0.5'">Yarım Porsiyon</div>
          <div class="mb-2" v-if="item.portion == '1.5'">1.5 Porsiyon</div>
          <div
              class="mb-2"
              v-for="feature in item.featureList"
              v-if="item.featureList">
            <span v-for="(option, i) in filteredOptions(feature)">
              {{ option.name }}
              <span v-if="filteredOptions(feature).length != i + 1">, </span>
            </span>
          </div>
        </div>
      </div>
      <div
          class="col-6 text-end"
          v-if="
          getProductPaidTotalFromPayments(item.id) %
            itemAbsolutePrice(item, true) !=
            0 && type !== 'tables'">
        <div class="text-danger mb-1">
          -
          {{ getProductPaidTotalFromPayments(item.id) }}
          <!-- %            itemAbsolutePrice(item, true) -->
        </div>
        <div class="text-success">
          +
          {{
            itemAbsolutePrice(item) -
            (getProductPaidTotalFromPayments(item.id) %
                itemAbsolutePrice(item, true))
          }}
        </div>
      </div>
    </div>
  </div>
  <div
      :class="[
      'basket-items-row-item cursor-pointer flex-column align-items-start',
      'opacity-50',
    ]"
      v-if="
      getProductPaidTotalFromPayments(item.id) /
        tableDetailStore.payments[0]?.products[0]?.singleTotal >=
        1 &&
      tableDetailStore.cart.find((cartItem) => cartItem.id == item.id)
        .quantity > 1
    "
  >
    <div class="d-flex justify-content-between align-items-center w-100">
      <div class="basket-item-left">
        <h6 class="basket-item-quantity" v-if="type !== 'tables'">
          {{
            tableDetailStore.cart.find((cartItem) => cartItem.id == item.id)
                .quantity - itemAbsoluteQuantity(item)
          }}x
        </h6>
        <h6 v-if="item.divideQuantity" class="basket-item-divide-quantity">
          ({{ item.divideQuantity }})
        </h6>
        <div class="basket-item-label d-flex flex-column gap-0">
          <div class="d-flex justify-content-start align-items-center gap-2">
            <span
                class="basket-item-print"
                v-if="type === 'tables' && item.orders[0].printed > 0"
            >{{ item.orders[0].printed }}</span
            >
            {{ item.name }}
          </div>
        </div>
      </div>
      <div class="basket-item-right">
        <div class="basket-item-price">
          {{
            formatPrice(
                (tableDetailStore.cart.find((cartItem) => cartItem.id == item.id)
                        .quantity -
                    itemAbsoluteQuantity(item)) *
                tableDetailStore.payments[0]?.products[0].singleTotal
            )
          }}
        </div>
      </div>
    </div>
    <div class="row w-100 g-0">
      <div class="col-6">
        <div class="badge ps-2 text-dark text-start w-100">
          <div class="mb-2" v-if="item.portion == '0.5'">Yarım Porsiyon</div>
          <div class="mb-2" v-if="item.portion == '1.5'">1.5 Porsiyon</div>
          <div
              class="mb-2"
              v-for="feature in item.featureList"
              v-if="item.featureList"
          >
            <span v-for="(option, i) in filteredOptions(feature)">
              {{ option.name
              }}<span v-if="filteredOptions(feature).length != i + 1">, </span>
            </span>
          </div>
        </div>
      </div>
      <div
          class="col-6 text-end"
          v-if="
          getProductPaidTotalFromPayments(item.id) %
            itemAbsolutePrice(item, true) !=
            0 && type !== 'tables'
        "
      ></div>
    </div>
  </div>
  <div
      class="basket-items-row-item cursor-pointer opacity-50 flex-column align-items-start"
      v-if="type !== 'tables' && item.exclude > 0"
      @mouseenter="pressedItemId = item.id"
      @touchstart="pressedItemId = item"
      ref="longPress"
  >
    <div class="d-flex justify-content-between align-items-center w-100">
      <div class="basket-item-left">
        <h6 class="basket-item-quantity" v-if="type !== 'tables'">
          {{ item.exclude }}x
        </h6>
        <div class="basket-item-label d-flex flex-column gap-0">
          <div class="d-flex justify-content-start align-items-center gap-2">
            <span
                class="basket-item-print"
                v-if="type === 'tables' && item.orders[0].printed > 0"
            >{{ item.orders[0].printed }}</span
            >
            {{ item.name }}
          </div>
        </div>
      </div>
      <div class="basket-item-right">
        <div class="basket-item-price">{{ itemAbsolutePrice(item) }}₺</div>
      </div>
    </div>
    <div class="badge ps-2 text-dark text-start w-100" v-if="item.featureList">
      <div class="mb-2" v-if="item.portion == '0.5'">Yarım Porsiyon</div>
      <div class="mb-2" v-if="item.portion == '1.5'">1.5 Porsiyon</div>
      <div class="mb-2" v-for="feature in item.featureList">
        <span v-for="(option, i) in filteredOptions(feature)">
          {{ option.name
          }}<span v-if="filteredOptions(feature).length != i + 1">, </span>
        </span>
      </div>
    </div>
    <div class="text-start w-100 ps-2 badge text-dark">
      İkram Nedeni: {{ item.exclude_note }}
    </div>
  </div>
</template>

<style src="./PBasketItems.scss" lang="scss" scoped />
