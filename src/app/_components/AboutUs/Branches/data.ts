export const Branches = [
  {
    name: "Richmond Branch",
    visit_address: "1952 KINGSWAY AVE UNIT 420, RICHMOND",
    header_address: "Unit #3 - 4 12331 Bridgeport Road\nRichmond, BC. V6V 1J4",
    hours: "7:00 am - 5:00 pm",
    phone: "(778) 295-2570",
    src: "RichmondBranch.svg",
    iframeSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2607.4224248614655!2d-123.08452037688126!3d49.19254557713234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54867507f9e2f101%3A0xa3a36506b608f38!2zMTIzMzEgQnJpZGdlcG9ydCBSZCAzIDQsIFJpY2htb25kLCBCQyBWNlYgMUo0LCDXp9eg15PXlA!5e0!3m2!1siw!2sil!4v1699563647630!5m2!1siw!2sil",
  },
  {
    name: "Port Coquitlam Branch",
    visit_address: "12331 BRIDGEPORT ROAD UNIT 3~4, PORT COQUITLAM",
    header_address:
      "Unit #420 1952 Kingsway Avenue\nPort Coquitlam, BC.  V3C 1S5",
    hours: "7:00 am - 5:00 pm",
    phone: "(778) 285-3999",
    src: "PortBranch.svg",
    iframeSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2604.0921555914506!2d-122.76860687688409!3d49.25569917266406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5485d6008f3e3a79%3A0x89fccdbbfb3fb0d1!2s1952%20Kingsway%20Ave%20Unit%20420%2C%20Port%20Coquitlam%2C%20BC%20V3C%206C2%2C%20%D7%A7%D7%A0%D7%93%D7%94!5e0!3m2!1siw!2sil!4v1699563682305!5m2!1siw!2sil",
  },
  {
    name: "Burnaby Branch",
    visit_address: "4012 MYRTLE ST, BURNABY",
    header_address: "4012 Myrtle Street\nBurnaby, BC.  V5C 4G2",
    hours: "7:00 am - 5:00 pm",
    phone: "(604) 570-0867",
    src: "BurnabyBranch.svg",
    iframeSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2603.8919388934555!2d-123.01293337688415!3d49.25949407239544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x548676d80f0ae57f%3A0x9b4fdcbf4f3059e3!2zNDAxMiBNeXJ0bGUgU3QsIEJ1cm5hYnksIEJDIFY1QyA0RzIsINen16DXk9eU!5e0!3m2!1siw!2sil!4v1699563572149!5m2!1siw!2sil",
  },
] as const;

export type BranchName = typeof Branches[number]["name"];

export function isBranchName(value: string): value is BranchName {
  return Branches.some(branch => branch.name === value);
}
