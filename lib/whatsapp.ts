import { formatINR } from "./format";
import { formatWeight, getProduct } from "./products";
import type { WeightOption } from "./products";

export const WHATSAPP_NUMBER = "919032219521";
export const WHATSAPP_DISPLAY = "+91 90322 19521";
export const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export interface OrderLine {
  productId: string;
  productName: string;
  weight: WeightOption;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export function buildOrderLines(
  items: { productId: string; weight: WeightOption; quantity: number }[],
): OrderLine[] {
  return items.map((item) => {
    const product = getProduct(item.productId);
    const unitPrice = product ? product.prices[item.weight] : 0;
    return {
      productId: item.productId,
      productName: product ? product.name : item.productId,
      weight: item.weight,
      quantity: item.quantity,
      unitPrice,
      lineTotal: unitPrice * item.quantity,
    };
  });
}

export function buildWhatsAppOrderMessage(lines: OrderLine[]): string {
  const total = lines.reduce((sum, l) => sum + l.lineTotal, 0);
  const itemLines = lines.map(
    (l, i) =>
      `${i + 1}. ${l.productName} - ${formatWeight(l.weight)} - ${formatINR(l.unitPrice)} x ${l.quantity} = ${formatINR(l.lineTotal)}`,
  );

  return [
    "Hello Zohra Zaika!",
    "",
    "I would like to order these homemade pickles:",
    "",
    ...itemLines,
    "",
    `Total: ${formatINR(total)}`,
    "",
    "Please confirm availability and delivery or pickup details.",
    "",
    "Thank you!",
  ].join("\n");
}

export function whatsAppUrlForOrder(
  items: { productId: string; weight: WeightOption; quantity: number }[],
): string {
  const lines = buildOrderLines(items);
  const message = buildWhatsAppOrderMessage(lines);
  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`;
}

export function whatsAppUrlForSingle(
  productName: string,
  weight: WeightOption,
  unitPrice: number,
): string {
  const message = [
    "Hello Zohra Zaika!",
    "",
    "I would like to order this homemade pickle:",
    "",
    `1. ${productName} - ${formatWeight(weight)} - ${formatINR(unitPrice)}`,
    "",
    `Total: ${formatINR(unitPrice)}`,
    "",
    "Please confirm availability and delivery or pickup details.",
    "",
    "Thank you!",
  ].join("\n");
  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`;
}

export function whatsAppUrlForContact(
  name: string,
  phone: string,
  message: string,
): string {
  const text = [
    "Hello Zohra Zaika!",
    "",
    `Name: ${name}`,
    `Phone: ${phone}`,
    "",
    message,
    "",
    "Please share details about products and ordering.",
    "Thank you!",
  ].join("\n");
  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(text)}`;
}
