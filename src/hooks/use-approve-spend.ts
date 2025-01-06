import { useCallback } from "react";
import { erc20Abi, parseUnits } from "viem";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";

import type { Address } from "viem";

const cryptoTippingAddress = "0x89A6596016C136C3b52Be584249e6359E1fdD637";

export const useApproveSpend = ({
  address,
  totalAmount,
  decimals,
}: {
  address: Address;
  totalAmount: string;
  decimals: number;
}) => {
  const {
    data: hash,
    isPending,
    writeContractAsync,
    error: approvalError,
    isError: isApprovalError,
  } = useWriteContract();

  const { isLoading: isApproving, isSuccess: isApproved } =
    useWaitForTransactionReceipt({
      hash,
    });

  const triggerApprove = useCallback(async (): Promise<string> => {
    if (!totalAmount || !decimals || isPending || isApproving || isApproved)
      throw new Error("Invalid state for approval");

    console.log("triggerApprove", address, totalAmount, decimals);

    const tokenContract = {
      abi: erc20Abi,
      address: address,
    };

    // Increase amount by 5% and round up
    const increasedAmount = Math.ceil(Number(totalAmount) * 1.05);
    const amountInWei = parseUnits(increasedAmount.toString(), decimals);

    return writeContractAsync({
      ...tokenContract,
      functionName: "approve",
      args: [cryptoTippingAddress, amountInWei],
    });
  }, [
    address,
    decimals,
    isApproved,
    isApproving,
    isPending,
    totalAmount,
    writeContractAsync,
  ]);

  return {
    hash,
    isPending,
    isApproved,
    isApproving,
    triggerApprove,
    approvalError,
    isApprovalError,
  };
};
